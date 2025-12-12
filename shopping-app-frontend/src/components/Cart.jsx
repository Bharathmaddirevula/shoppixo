import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart = [], removefromCart, increaseQty, decreaseQty }) => {
  const navigate = useNavigate();

  const total = cart.reduce(
    (s, item) => s + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Your Cart</h3>

      {cart.length === 0 ? (
        <p style={styles.empty}>Cart is empty</p>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <div key={item.productId} style={styles.row}>
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  style={styles.img}
                />
                <div style={styles.info}>
                  <div style={styles.name}>{item.name}</div>
                  <div>₹ {item.price}</div>

                  <div style={styles.qtyRow}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decreaseQty(item.productId)}
                    >
                      -
                    </button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => increaseQty(item.productId)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.removeBtn}
                    onClick={() => removefromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.total}>Total: ₹ {total.toFixed(2)}</div>

          {/* ⭐ CHECKOUT BUTTON ADDED HERE ⭐ */}
          <button
            onClick={() => navigate("/checkout")}
            style={styles.checkoutBtn}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  title: { marginBottom: "12px" },
  empty: { color: "#666" },
  row: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    alignItems: "center",
  },
  img: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: { flex: 1 },
  name: { fontWeight: "bold" },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  qtyBtn: {
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  qty: { minWidth: "24px", textAlign: "center" },
  removeBtn: {
    marginTop: "8px",
    background: "#ff4d4f",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  total: {
    marginTop: "18px",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: "18px",
  },

  // ⭐ NEW CHECKOUT BUTTON STYLE
  checkoutBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Cart;
