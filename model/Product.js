const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0, 
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String
  }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
