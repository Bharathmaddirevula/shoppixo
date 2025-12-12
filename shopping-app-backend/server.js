const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cartRoutes = require("./routes/cartRoutes");
const app = express();
const orderRoutes = require("./routes/orders");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orders"));



// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/shoppingapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
