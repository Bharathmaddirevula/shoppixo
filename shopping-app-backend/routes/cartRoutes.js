const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

/**
 * POST /cart/add
 * Body: { userId, product: { productId, name, price, image } }
 * If cart doesn't exist -> create one
 * If product exists -> increase quantity
 * Else push new item
 */
router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;
    if (!userId || !product || !product.productId) {
      return res.status(400).json({ message: "Missing userId or product" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ ...product, quantity: 1 }],
      });
    } else {
      const item = cart.items.find((i) => i.productId === product.productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    }

    await cart.save();
    return res.json({ message: "Added/updated cart", cart });
  } catch (err) {
    console.error("cart add error:", err);
    return res.status(500).json({ message: err.message });
  }
});

/**
 * GET /cart/:userId
 * Returns the cart for the given userId, or empty cart object
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    return res.json(cart || { userId, items: [] });
  } catch (err) {
    console.error("fetch cart error:", err);
    return res.status(500).json({ message: err.message });
  }
});

/**
 * POST /cart/remove
 * Body: { userId, productId }
 * Removes the item
 */
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart empty", cart: { userId, items: [] } });

    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();

    return res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error("remove error:", err);
    return res.status(500).json({ message: err.message });
  }
});

/**
 * POST /cart/increase
 * Body: { userId, productId }
 * Increases quantity by 1
 */
router.post("/increase", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: "Missing userId or productId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart empty", cart: { userId, items: [] } });

    const item = cart.items.find((i) => i.productId === productId);
    if (item) item.quantity += 1;
    await cart.save();

    return res.json({ message: "Quantity increased", cart });
  } catch (err) {
    console.error("increase error:", err);
    return res.status(500).json({ message: err.message });
  }
});

/**
 * POST /cart/decrease
 * Body: { userId, productId }
 * Decreases quantity by 1; removes item if quantity becomes 0
 */
router.post("/decrease", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: "Missing userId or productId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart empty", cart: { userId, items: [] } });

    const item = cart.items.find((i) => i.productId === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter((i) => i.productId !== productId);
      }
    }

    await cart.save();
    return res.json({ message: "Quantity decreased/updated", cart });
  } catch (err) {
    console.error("decrease error:", err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
