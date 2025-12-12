const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// ⭐ CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order created", orderId: newOrder.orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});


// ⭐ GET ALL ORDERS OF A USER
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


module.exports = router;
