const path = require('path');

const Product = require('../model/Product');

const fetchProducts = async (req, res) => {
  let products = await Product.find({title: new RegExp(req.query.q, 'i')});
  res.send(products);
};

const postProduct = async (req, res) => {
  // console.log(req.files);
  
  // console.log(req.files?.image)
  try {
    let imagePath = null;
    if(req.files?.image) {
      let rootPath = path.resolve();
      let storageDir = path.join(rootPath, 'uploads');
      req.files.image.mv(path.join(storageDir, req.files.image.name));
      imagePath = path.join('uploads', req.files.image.name);
    }
    let product = await Product.create({...req.body, createdBy: req.user._id});
    res.send(product);
  } catch (err) {
    res.send({
      message: err.message,
      stack: err.stack
    });
  }
};

const deleteProduct = async (req, res) => {
  let { id } = req.params;
  let deleted = await Product.findByIdAndDelete(id);
  res.send('deleted');
};

const updateProduct = (req, res) => {
  res.send("Updated");
};

module.exports = {
    fetchProducts,
    postProduct,
    deleteProduct,
    updateProduct
};


