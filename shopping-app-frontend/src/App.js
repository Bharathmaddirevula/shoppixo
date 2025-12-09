import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OffersPage from "./components/OffersPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { jwtDecode } from "jwt-decode";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);


  const [hoverBanner, setHoverBanner] = useState(false); // ⭐ hover state

  const token = localStorage.getItem("token");
  // ---------------------------
  // FETCH CART
  // ---------------------------
  const fetchCart = async () => {
    if (!token) return;
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    const res = await fetch(`http://localhost:5000/cart/${userId}`);
    const data = await res.json();
    setCart(data.items || []);
  };
  // ADD TO CART
  const addToCart = async (product) => {
    if (!token) return alert("Please login first");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      }),
    });
    fetchCart();
  };
  let user = null;
if (token) {
  try {
    user = jwtDecode(token);
  } catch (err) {
    console.log("Invalid token");
  }
}

  // REMOVE FROM CART
  const removefromCart = async (productId) => {
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await fetch("http://localhost:5000/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    fetchCart();
  };
  // Increase Qty
  const increaseQty = async (productId) => {
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await fetch("http://localhost:5000/cart/increase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    fetchCart();
  };
  // Decrease Qty
  const decreaseQty = async (productId) => {
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await fetch("http://localhost:5000/cart/decrease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    fetchCart();
  };
  // ---------------------------
  // FETCH PRODUCTS
  // ---------------------------
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
      fetchCart();
    }
  }, [token]);

  // ---------------------------
  // SEARCH + CATEGORY + SORT
  // ---------------------------
  let filteredProducts = [...products];

  filteredProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // ---------------------------
  // HOME PAGE
  // ---------------------------
  const Home = () => (
    <div className="motion-bg" style={styles.homeContainer}>
      <h1 style={styles.heading}>🛍 SHOPPIXO — Shop Smart, Live Better</h1>
      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBox}
        />
      </div>
      {/* Filters */}
      <div style={styles.filterRow}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Categories</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Grocery">Grocery</option>
          <option value="Beauty">Beauty</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>
      {/* Banner */}
      <div style={styles.bannerWrapper}>
        <Link to="/offers" style={{ display: "block", width: "100%" }}>
          <img
            src="/sales2.png"
            alt="Sale Banner"
            style={{
              ...styles.bannerImage,
              transform: hoverBanner ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={() => setHoverBanner(true)}
            onMouseLeave={() => setHoverBanner(false)}
          />
        </Link>
      </div>
      {/* Products + Cart */}
      <div style={styles.mainContent}>
        <ProductList products={filteredProducts} addToCart={addToCart} />
        <Cart
          cart={cart}
          removefromCart={removefromCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      </div>
      <Footer />
    </div>
  );
  return (
    <BrowserRouter>
     <nav style={styles.nav}>
  {token && <Link to="/" style={styles.navLink}>Home</Link>}
  {/* 👉 ADD THESE TWO LINKS HERE */}
  <Link to="/about" style={styles.navLink}>About</Link>
  <Link to="/contact" style={styles.navLink}>Contact</Link>
  {!token && (
    <>
      <Link to="/login" style={styles.navLink}>Login</Link>
      <Link to="/signup" style={styles.navLink}>Signup</Link>
    </>
  )}
  {token && (
    <div style={styles.profileContainer}>
      <img
        src="/photo1.jpg"
        alt="Profile"
        style={styles.profilePic}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      <div style={styles.profileInfo}>
        Hi, <b>{user?.email?.split("@")[0]}</b>
      </div>
      {showDropdown && (
        <div className="dropdown-content">
          <p>👤 My Profile</p>
          <p>🛒 My Orders</p>
          <p>⚙ Settings</p>
          <p
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            🚪 Logout
          </p>
        </div>
      )}
    </div>
  )}
</nav>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/offers" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />  
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
// -----------------------------
// STYLES
// -----------------------------
const styles = {
  profileContainer: {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "relative",
  cursor: "pointer",
},
profilePic: {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "2px solid white",
  objectFit: "cover",
},
profileInfo: {
  color: "white",
  fontSize: "16px",
  fontWeight: "500",
},
  nav: {
    padding: "15px",
    background: "#222",
    display: "flex",
    gap: "20px",
    color: "white",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  logoutBtn: {
    marginLeft: "auto",
    background: "red",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
 homeContainer: {
  padding: "20px",
  minHeight: "100vh",
  animation: "gradientMove 12s ease infinite",
  background: "linear-gradient(135deg, #f3e7e9, #e3eeff, #d9e4ff)",
  backgroundSize: "300% 300%",
},
  heading: {
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "20px",
  },
  searchContainer: { textAlign: "center" },
  searchBox: {
    padding: "12px",
    width: "350px",
    borderRadius: "10px",
    border: "1px solid #aaa",
  },
  filterRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "40px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #aaa",
  },
  bannerWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  bannerImage: {
    width: "100%",
    maxWidth: "1300px",
    height: "280px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
    marginTop: "30px",
  },
};
export default App;
