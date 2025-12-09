import React from "react";

export default function OffersPage() {
  const offers = [
    {
      name: "Running Shoes",
      oldPrice: 999,
      newPrice: 499,
      image: "https://via.placeholder.com/250"
    },
    {
      name: "Smart Watch",
      oldPrice: 1999,
      newPrice: 999,
      image: "https://via.placeholder.com/250"
    },
    {
      name: "Bluetooth Headphones",
      oldPrice: 799,
      newPrice: 399,
      image: "https://via.placeholder.com/250"
    }
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🔥 Mega Sale — 50% OFF</h1>
      <p style={styles.subtitle}>Valid December 1 to December 7</p>

      <div style={styles.grid}>
        {offers.map((item, index) => (
          <div key={index} style={styles.card}>
            <img src={item.image} style={styles.image} alt="" />
            <h3>{item.name}</h3>

            <p>
              <span style={styles.oldPrice}>₹{item.oldPrice}</span>
              <span style={styles.newPrice}>₹{item.newPrice}</span>
            </p>

            <button style={styles.btn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px", textAlign: "center" },
  title: { fontSize: "32px", fontWeight: "bold" },
  subtitle: { color: "gray", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  image: { width: "100%", borderRadius: "10px" },
  oldPrice: {
    color: "gray",
    textDecoration: "line-through",
    marginRight: "10px"
  },
  newPrice: { color: "red", fontWeight: "bold" },
  btn: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer"
  }
};
