import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>{item.description}</p>
            {item.image && <img src={item.image} width="150" />}
          </div>
        ))
      )}
    </div>
  );
}

export default Products;
