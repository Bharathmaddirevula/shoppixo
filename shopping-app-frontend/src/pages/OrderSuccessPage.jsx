import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId, total } = location.state || {};

  // Delivery estimation
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 4);

  // Confetti Effect
  useEffect(() => {
    const duration = 1500;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      const confetti = document.createElement("div");

      confetti.className = "confetti";
      confetti.style.left = randomX + "px";
      confetti.style.top = randomY + "px";

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 1000);
      requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div style={styles.page}>
      {/* Animated Checkmark */}
      <div style={styles.checkCircle}>
        <div style={styles.check}>✔</div>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>Order Successful 🎉</h1>

        <p style={styles.text}>
          Your order has been placed successfully!  
        </p>

        <p style={styles.info}>Order ID: <b>{orderId}</b></p>
        <p style={styles.info}>Amount Paid: <b>₹{total}</b></p>
        <p style={styles.info}>
          Delivery Expected: <b>{delivery.toDateString()}</b>
        </p>

        <button style={styles.btn} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// ⚡ Stylish CSS-in-JS
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #d7f7ff, #d2ffe8, #fff3c9)",
    padding: "30px",
    textAlign: "center",
    position: "relative",
  },

  checkCircle: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "#4CAF50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px auto",
    boxShadow: "0 10px 30px rgba(0, 150, 0, 0.3)",
    animation: "pop 0.6s ease-out",
  },

  check: {
    fontSize: "70px",
    color: "white",
    fontWeight: "bold",
  },

  card: {
    background: "white",
    padding: "30px",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.8s ease-out",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  text: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#444",
  },

  info: {
    fontSize: "18px",
    marginBottom: "10px",
  },

  btn: {
    marginTop: "25px",
    padding: "15px",
    width: "80%",
    fontSize: "20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

// Confetti CSS
const style = document.createElement("style");
style.innerHTML = `
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    background: rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255});
    animation: fall 1s linear forwards;
    border-radius: 50%;
  }

  @keyframes fall {
    from { transform: translateY(-20px); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }

  @keyframes pop {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default OrderSuccessPage;
