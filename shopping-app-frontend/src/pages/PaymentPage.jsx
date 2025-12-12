import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { total, paymentMethod, items } = location.state || {};
console.log("Payment Method Received:", paymentMethod);

  if (!location.state) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Payment information missing</h2>
        <button onClick={() => navigate("/checkout")}>Go Back</button>
      </div>
    );
  }

  const handlePayNow = async () => {
  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const userId = decoded.userId;

  const orderId = Date.now().toString();

  // Save order in backend
  await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      items,
      total,
      paymentMethod,
      orderId
    }),
  });

  // Navigate to success screen
  navigate("/order-success", {
    state: { orderId, total }
  });
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Secure Payment</h2>

        <h3 style={styles.label}>Total Amount</h3>
        <div style={styles.amountBox}>₹{total}</div>

        <h3 style={styles.label}>Selected Payment Method</h3>
        <div style={styles.methodBox}>{paymentMethod}</div>

        {/* ⭐ SHOW QR IF PAYMENT METHOD = UPI */}
        {paymentMethod?.toLowerCase() === "upi" &&  (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <h3 style={styles.label}>Scan & Pay</h3>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummy@upi&pn=SHOPPIXO&am=1"
              alt="UPI QR"
              style={styles.qr}
            />
            <p style={styles.upiText}>
              UPI ID: <b>dummy@upi</b>
              <br />
              After payment, click Pay Now
            </p>
          </div>
        )}

        {/* ⭐ SHOW CARD FORM IF PAYMENT METHOD = CARD */}
        {paymentMethod?.toLowerCase() === "card" && (
          <div style={styles.cardForm}>
            <h3 style={styles.label}>Enter Card Details</h3>

            <input style={styles.input} placeholder="Card Number 1234 5678 9012 3456" />
            <div style={{ display: "flex", gap: "10px" }}>
              <input style={styles.inputSmall} placeholder="MM/YY" />
              <input style={styles.inputSmall} placeholder="CVV" />
            </div>
            <input style={styles.input} placeholder="Cardholder Name" />
          </div>
        )}

        {/* ⭐ PAY NOW BUTTON */}
        <button style={styles.payBtn} onClick={handlePayNow}>
          Pay Now
        </button>

        <p style={styles.secureText}>🔒 Secure Payment Gateway</p>
      </div>
    </div>
  );
};

// 🌟 STYLES
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #d9e4ff, #b7ffd3, #ffe5b4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: 450,
    background: "white",
    padding: 30,
    borderRadius: 18,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 6,
  },
  methodBox: {
    background: "#eef5ff",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 500,
    textAlign: "left",
    marginBottom: 20,
  },
  amountBox: {
    background: "#fff2cc",
    padding: 12,
    borderRadius: 10,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "left",
  },
  qr: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  upiText: {
    marginTop: 10,
    color: "#444",
    fontSize: 16,
  },
  cardForm: {
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  inputSmall: {
    width: "48%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  payBtn: {
    background: "#ffcc00",
    padding: 14,
    width: "100%",
    borderRadius: 12,
    fontSize: 20,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: 15,
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  secureText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
};

export default PaymentPage;

