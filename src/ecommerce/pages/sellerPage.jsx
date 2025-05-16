import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const SellerDashboard = () => {
  const navigate = useNavigate();
  const [merchantName, setMerchantName] = useState("Merchant");

  useEffect(() => {
    // so that whenever on navigate page it checks if the user is logged in or not
    const merchantId = sessionStorage.getItem("merchantId");
  if (!merchantId) {
    navigate("/", { replace: true }); 
  } else {
    const name = sessionStorage.getItem("name") || "Merchant";
    setMerchantName(name);
  }
  }, []);

  const handleAddProduct = () => navigate("/add-product");
  const handleViewEditProducts = () => navigate("/view-products");
  const handleViewOrders = () => navigate("/view-orders");
  const handleViewProfile = () => navigate("/merchant-profile");
  const handleLogout = () => {
    sessionStorage.clear();  
    navigate("/", { replace: true });  
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome👋</h2>
        <p style={styles.subtext}>Here's your dashboard to manage everything!</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>📦 Products</h3>
          <button style={styles.button} onClick={handleAddProduct}>➕ Add Product</button>
          <button style={styles.button} onClick={handleViewEditProducts}>🛠️ Manage Products</button>
        </div>

        <div style={styles.card}>
          <h3>📋 Orders</h3>
          <button style={styles.button} onClick={handleViewOrders}>🔍 View Orders</button>
        </div>

        <div style={styles.card}>
          <h3>👤 Profile</h3>
          <button style={styles.button} onClick={handleViewProfile}> View Profile</button>
          <button style={styles.logoutButton} onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      <div style={styles.footer}>
        <p>✨ Happy Selling!</p>
      </div>
    </div>
  );
};



const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  subtext: {
    color: "#444",
    fontSize: "18px",
    marginTop: "6px",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    backgroundColor: "#3f51b5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "14px",
    width: "100%",
    marginTop: "10px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  footer: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "17px",
    color: "#333",
    fontWeight: 500,
  },
};

export default SellerDashboard;
