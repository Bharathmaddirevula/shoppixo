import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart }) => {
  return (
    <div style={styles.grid}>
      {products.length === 0 ? (
        <p>No products found...</p>
      ) : (
        products.map((p) => (
          <ProductCard key={p._id} product={p} addToCart={addToCart} />
        ))
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
};

export default ProductList;
