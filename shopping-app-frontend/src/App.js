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
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import { jwtDecode } from "jwt-decode";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverBanner, setHoverBanner] = useState(false);

  // TOKEN
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.log("Invalid token");
    }
  }

  // FETCH CART
  const fetchCart = async () => {
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    const res = await fetch(`http://localhost:5000/cart/${userId}`);
    const data = await res.json();
    setCart(data.items || []);
  };

  // CART FUNCTIONS
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

  // LOAD PRODUCTS + CART
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));

      fetchCart();
    }
  }, [token]);

  // FILTERING LOGIC
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // HOME PAGE
  const Home = () => (
    <div style={styles.homeContainer}>
      <div className="glow-orb" style={{ top: "20%", left: "10%" }}></div>
      <div className="glow-orb" style={{ top: "60%", left: "70%" }}></div>

      <h1 style={styles.heading}>🛍 SHOPPIXO — Shop Smart, Live Better</h1>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBox}
        />
      </div>

      <div style={styles.filterRow}>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
          <option value="All">All Categories</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Grocery">Grocery</option>
          <option value="Beauty">Beauty</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      <div style={styles.bannerWrapper}>
        <Link to="/offers">
          <img
            src="/Gemini.png"
            alt="Sale Banner"
            style={{
              ...styles.bannerImage,
              transform: hoverBanner ? "scale(1.02)" : "scale(1)",
              transition: "0.3s",
            }}
            onMouseEnter={() => setHoverBanner(true)}
            onMouseLeave={() => setHoverBanner(false)}
          />
        </Link>
      </div>

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

  // MAIN RETURN
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        {token && <Link to="/" style={styles.navLink}>Home</Link>}
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
              alt="profile"
              style={styles.profilePic}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <div style={styles.profileInfo}>
              Hi, {user?.email?.split("@")[0]}
            </div>

            {showDropdown && (
              <div className="dropdown-content">
                <p>👤 My Profile</p>
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

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/offers" element={<ProtectedRoute><OffersPage addToCart={addToCart} /></ProtectedRoute>} />

        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage cartItems={cart} user={user} /></ProtectedRoute>} />

        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />

        <Route path="/order-success" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />

        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

//
// STYLES
//
const styles = {
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
  profileContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid white",
    cursor: "pointer",
  },
  profileInfo: { color: "white", fontSize: "16px" },

  homeContainer: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f3e7e9,#e3eeff,#d9e4ff)",
    backgroundSize: "300% 300%",
    position: "relative",
    overflow: "hidden",
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
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #aaa",
  },

  bannerWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
    width: "100%",
  },

  bannerImage: {
    width: "95%",
    maxWidth: "1600px",
    height: "320px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  mainContent: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
  },
};

export default App;
