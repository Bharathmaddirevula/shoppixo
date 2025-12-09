import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
      <p style={{ fontSize: "14px", color: "blue" }}>
        Category: {product.category}
      </p>

      <button onClick={() => addToCart(product)} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProductCard;
