const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  products: [
    {
      _id: ObjectId,
      rate: {
        type: Number,
        required: true,
      },
      quantity: Number,
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
