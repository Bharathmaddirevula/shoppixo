import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartItems = [], user }) => {
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!shipping.name || !shipping.phone || !shipping.address || !shipping.pincode) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: user?.userId,
        items: cartItems,
        shipping,
        paymentMethod,
        total,
      });

      if (response.status === 201) {
        navigate(`/order-success/${response.data.orderId}`);
      }
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };
const handlePaymentNavigation = () => {
  navigate("/payment", {
    state: {
      total,
      paymentMethod,
      items: cartItems
    }
  });
};

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛒 Checkout</h1>

      <div style={styles.card}>
        {/* Shipping Section */}
        <h2 style={styles.sectionTitle}>Shipping Details</h2>
        <div style={styles.row}>
          <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.row}>
          <input name="address" placeholder="Address" onChange={handleChange} style={styles.input} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} style={styles.input} />
        </div>

        {/* Payment Section */}
        <h2 style={styles.sectionTitle}>Payment Method</h2>
        <div style={styles.paymentBox}>
          <label><input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} /> Cash on Delivery</label>
<label><input type="radio" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} /> UPI</label>
<label><input type="radio" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} /> Debit / Credit Card</label>

        </div>

        {/* Order Summary */}
        <h2 style={styles.sectionTitle}>Order Summary</h2>
        <div style={styles.summaryCard}>
          {cartItems.map((item) => (
            <div key={item.productId} style={styles.summaryRow}>
              <span>{item.name} (x{item.quantity})</span>
              <strong>₹ {item.price * item.quantity}</strong>
            </div>
          ))}

          <hr />
          <h2 style={styles.total}>Total: ₹ {total}</h2>
        </div>

        {/* Order Button */}
        <button
  onClick={handlePaymentNavigation}
  style={styles.orderBtn}
>
  Place Order
</button>

      </div>
    </div>
  );
};

//
// ----------- UI STYLES (Flipkart / Amazon Theme) -----------
//

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #e3f2fd, #fff3e0, #fff8e1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#0d47a1",
  },
  card: {
    background: "white",
    width: "650px",
    margin: "auto",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#1976d2",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #90caf9",
    fontSize: "16px",
    background: "#e3f2fd",
  },
  paymentBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "#fff9c4",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #fbc02d",
  },
  summaryCard: {
    background: "#e3f2fd",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #64b5f6",
    marginBottom: "20px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
  },
  total: {
    textAlign: "right",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1b5e20",
  },
  orderBtn: {
    width: "100%",
    padding: "15px",
    fontSize: "20px",
    background: "#ffcc00", // Amazon yellow
    color: "black",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default CheckoutPage;
