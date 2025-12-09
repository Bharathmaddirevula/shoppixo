import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  };

 return (
  <div style={styles.container}>

    {/* LOGIN BOX */}
    <form onSubmit={handleSubmit} style={styles.card}>
      <h2 style={styles.title}>Welcome Back</h2>

      <input
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        style={styles.input}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>Login</button>

      <p style={styles.linkText}>
        Don't have an account?{" "}
        <a href="/signup" style={styles.link}>Sign Up</a>
      </p>
    </form>

    {/* LOGO BELOW FORM */}
    <img 
      src="/logo.png"
      alt="Shoppixo Logo"
      style={styles.logoImage}
    />

  </div>
);

}

const styles = {
  container: {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "40px",
  backgroundColor: "#121212",   // ✔ Pure black background
},
logoImage: {
  width: "380px",
  marginTop: "40px",
},

card: {
  width: "320px",
  padding: "22px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.90)",
  backdropFilter: "blur(4px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
},

  

  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    padding: "12px",
    background: "#007bff",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  linkText: {
    textAlign: "center",
    marginTop: "10px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Login;
