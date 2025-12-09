import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.row}>

        <div style={styles.col}>
          <h3 style={styles.title}>Shopping App</h3>
          <p style={styles.text}>Buy anything, anytime 🛍️</p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.subtitle}>Quick Links</h4>
          <a href="/" style={styles.link}>Home</a>
          <a href="/login" style={styles.link}>Login</a>
          <a href="/signup" style={styles.link}>Signup</a>
        </div>

        <div style={styles.col}>
          <h4 style={styles.subtitle}>Contact</h4>
          <p style={styles.text}>📧 support@shoppingapp.com</p>
          <p style={styles.text}>📞 +91 9701755846</p>
        </div>

      </div>

      <p style={styles.copy}>
        © {new Date().getFullYear()} Shopping App. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#222",
    color: "white",
    padding: "20px",
    borderRadius: "15px 15px 0 0",
    marginTop: "40px",
    textAlign: "center",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  col: {
    width: "30%",
    textAlign: "left",
  },

  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  link: {
    display: "block",
    color: "#ddd",
    fontSize: "15px",
    marginBottom: "5px",
    textDecoration: "none",
  },

  text: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#ccc",
  },

  copy: {
    marginTop: "20px",
    fontSize: "13px",
    opacity: 0.7,
  },
};

export default Footer;
