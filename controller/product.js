const path = require("path");
const fs = require("fs");

const Product = require("../model/Product");

const fetchProducts = async (req, res) => {
  let sort = req.query.sort || "priceAsc";
  let sortBy = {
    price: 1,
  };

  if (sort == "priceDesc") {
    sortBy.price = -1;
  } else if (sort == "priceAsc") {
    sortBy.price = 1;
  }

  let products = await Product.find({
    title: new RegExp(req.query.q, "i"),
  }).sort(sortBy); //.populate('createdBy')
  res.send(products);
};

const postProduct = async (req, res, next) => {
  // console.log(req.files);

  // console.log(req.files?.image);
  // console.log(req.files?.image);
  try {
    if (req.files?.image.mimetype.slice(0, 5) == "image") {
      let imagePath = null;
      let timeStamp = Date.now() + Math.floor(Math.random() * 1000);
      if (req.files?.image) {
        let rootPath = path.resolve();
        imagePath = path
          .join("/", "uploads", `${timeStamp} - ${req.files.image.name}`)
          .replaceAll("\\", "/");
        req.files.image.mv(path.join(rootPath, `${imagePath}`));
      }
    }
    let product = await Product.create({
      ...req.body,
      // image: imagePath,
      createdBy: req.user._id,
    });
    return res.send(product);
    res.status(400).send({
      message: "image only",
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    let matched = await Product.findById(id);
    if (!matched) {
      let error = new Error(); //creating our own error
      error.statusCode = 404;
      error.message = "Document not found";
      throw error;
      return res.status(404).send("No document found");
    }
    let deleted = await Product.findByIdAndDelete(id);

    fs.unlinkSync(path.join(path.resolve(), deleted.image));
    return res.send("deleted");
  } catch (err) {
    next(err);
  }
};

const updateProduct = (req, res) => {
  res.send("Updated");
};

module.exports = {
  fetchProducts,
  postProduct,
  deleteProduct,
  updateProduct,
};
