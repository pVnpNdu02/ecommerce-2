
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const isComingBack = sessionStorage.getItem("email") === null;
    const navType = window.performance.getEntriesByType("navigation")[0]?.type;
    if (isComingBack && (navType === "back_forward" || navType === "navigate")) {
      alert("No authentication data found. Please log in again.");
      navigate("/login", { replace: true }); // force login
    }
  }, []); 

  const handleLogin = async () => {
    console.log("Login button clicked");
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Response:", data);

        // Store all relevant info
        sessionStorage.setItem("_id", data._id);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("phone", data.phone);
        sessionStorage.setItem("address", data.address);
        sessionStorage.setItem("zipcode", data.zipcode);  
        sessionStorage.setItem("city", data.city);  
        sessionStorage.setItem("country", data.country);  
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("password", data.password);
        if (data.merchantId) sessionStorage.setItem("merchantId", data.merchantId);

        if (data.role === "merchant") {
          navigate("/merchant");
        } else {
          navigate("/user");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Server error.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subtext}>Login to your account</p>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <button style={styles.link} onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
        <p style={styles.newUserText}>New here?</p>
        <button style={styles.registerButton} onClick={() => navigate("/register")}>
          Register as New User
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "5px",
    fontSize: "24px",
    color: "#333",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6f00",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: "15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "12px",
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1b5e20",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    fontSize: "15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  link: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "14px",
    marginBottom: "10px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  newUserText: {
    fontSize: "14px",
    color: "#444",
    margin: "10px 0 8px",
  },
};
