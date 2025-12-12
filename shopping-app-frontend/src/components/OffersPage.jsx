import React from "react";

export default function OffersPage({ addToCart }) {

  // ⭐ FIXED: Actual offers array
  const offers = [
    {
      _id: "offer1",
      name: "Running Shoes",
      oldPrice: 999,
      price: 499,
      image: "https://imgs.search.brave.com/pcl4sdY5wksOpIPA-1oiCcOXjwjUcpd7hJ2fuoU3oHU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU5/MDEwOTE3L3Bob3Rv/L3J1bm5pbmctc2hv/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9HaDdLVWlD/RW1lU3hwdG53d1Rx/clVmOXlBVEZRcWpa/MlRaMi0wTHFhSUU9"
    },
    {
      _id: "offer2",
      name: "Smart Watch",
      oldPrice: 1999,
      price: 999,
      image: "https://imgs.search.brave.com/6C2HCKVa9wIQmluEDeqrtndeLRk0Iq6ymzjArN5HWD0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGl0YW4uY28uaW4v/ZHcvaW1hZ2UvdjIv/QktERF9QUkQvb24v/ZGVtYW5kd2FyZS5z/dGF0aWMvLS9TaXRl/cy10aXRhbi1tYXN0/ZXItY2F0YWxvZy9k/ZWZhdWx0L2R3ZTVh/ODI2ODIvaW1hZ2Vz/L0Zhc3RyYWNrL0Nh/dGFsb2cvMzgxMzVQ/UDA1S18yLmpwZz9z/dz0zNjAmc2g9MzYw"
    },
    {
      _id: "offer3",
      name: "Bluetooth Headphones",
      oldPrice: 799,
      price: 399,
      image: "https://imgs.search.brave.com/md79SE2D_M5QNit7wQKFyz132-vRu_1wgAwF3xYPHZs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQx/MTc0OTEyNy9waG90/by9oZWFkcGhvbmVz/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz10YlVlMVFHSWVt/U2xQZmFLWkRPWnN2/VU95b3Y1NDJLM0FI/ZG90UDJqZnQ4PQ"
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
              <span style={styles.newPrice}>₹{item.price}</span>
            </p>

            {/* ⭐ FIXED: Add to cart works now */}
            <button
              style={styles.btn}
              onClick={() =>
                addToCart({
                  _id: item._id,
                  name: item.name,
                  price: item.price,
                  image: item.image
                })
              }
            >
              Add to Cart
            </button>

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
