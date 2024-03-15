const Joi = require("joi");
const Order = require("../model/Order");
const Product = require("../model/Product")
const jwt = require("jsonwebtoken");

const storeOrderValidation = Joi.object({
  products: Joi.array()
    .items({
      _id: Joi.string().required(),
      quantity: Joi.number().required().min(1),
    })
    .min(1)
    .required(),
});

const showOrder = async (req, res) => {
  let order = await Order.find({});
  res.send(order);
}

const createOrder = async (req, res, next) => {
  try {
    await storeOrderValidation.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    let errors = err.details.map((el) => {
      //this error is only from joi validation
      //   console.log(err);
      return {
        field: el.context.key,
        name: err.name,
        message: el.message,
      };
    });
    return res.send({ errors });
  }
  try {
    let products = [];
    products = await req.body.products.map(async (el) => {
      let product = await Product.findOne({_id: el._id});
      // console.log(product);
      if(!product) {
        let error = new Error;
        error.statusCode = 404;
        error.message = 'no product found';
        throw next(error);
      }
      let order = {
        ...el,
        rate: product.price,
        name: product.title,
      };
      // console.log(order);
      return order;
    });
    products = await Promise.all(products);

    let order = await Order.create({ products });
    console.log(order)
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  showOrder
};
