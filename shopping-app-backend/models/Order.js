const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shipping: {
      name: String,
      phone: String,
      address: String,
      pincode: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
