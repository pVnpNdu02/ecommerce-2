
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const merchantId = sessionStorage.getItem("merchantId");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/products/merchant/${merchantId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products.");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        
        // Group products by type (case insensitive)
        const grouped = data.reduce((acc, product) => {
          const type = product.type.toLowerCase();
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});
        
        setGroupedProducts(grouped);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load products.");
      });
  }, [merchantId]);

  const handleDelete = (productId) => {
    fetch(`http://localhost:8080/products/delete/${productId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product.");
        
        // Update both products state and grouped products
        setProducts((prev) => {
          const updatedProducts = prev.filter((p) => p.id !== productId);
          
          // Regroup products
          const grouped = updatedProducts.reduce((acc, product) => {
            const type = product.type.toLowerCase();
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(product);
            return acc;
          }, {});
          
          setGroupedProducts(grouped);
          return updatedProducts;
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete product.");
      });
  };

  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e8f4f8 0%, #d1e6f0 100%)",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
        position: "relative",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        🛒 Your Products
      </h2>

      {/* Dashboard Button */}
      <button
        onClick={() => navigate(`/merchant/`)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          fontWeight: "500",
        }}
      >
        Dashboard
      </button>

      {/* Product List */}
      {products.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
            marginTop: "40px",
          }}
        >
          No products found.
        </p>
      ) : (
        <div>
          {Object.keys(groupedProducts).map((type) => (
            <div key={type} style={{ marginBottom: "40px" }}>
              <h3 
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#444",
                  marginBottom: "15px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #ccd7dd",
                  textTransform: "capitalize"
                }}
              >
                {type}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "30px",
                  justifyContent: "center",
                }}
              >
                {groupedProducts[type].map((product) => {
                  const merchantData = product.merchants.find(
                    (m) => String(m.merchantId) === String(merchantId)
                  );

                  return (
                    <div
                      key={product.id}
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F9F9F9",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div style={{ padding: "20px", flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "18px",
                            marginBottom: "15px",
                            textAlign: "center",
                            color: "#333",
                          }}
                        >
                          {product.name}
                        </h3>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "80px 1fr",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#555",
                          }}
                        >
                          <span style={{ fontWeight: "bold", color: "#444" }}>USP:</span>
                          <span>{product.usp}</span>
                          <span style={{ fontWeight: "bold", color: "#444" }}>Description:</span>
                          <span>{product.description}</span>
                          <span style={{ fontWeight: "bold", color: "#444" }}>Price:</span>
                          <span style={{ color: "#2a7d2a", fontWeight: "500" }}>
                            ₹{merchantData?.price}
                          </span>
                          <span style={{ fontWeight: "bold", color: "#444" }}>Stock:</span>
                          <span>{merchantData?.stock}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "10px",
                          padding: "15px 20px",
                          borderTop: "1px solid #eee",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <button
                          onClick={() => handleDelete(product.id)}
                          style={{
                            padding: "8px 0",
                            backgroundColor: "#FF4D4D",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                            boxShadow: "0 2px 4px rgba(255,77,77,0.2)",
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdate(product.id)}
                          style={{
                            padding: "8px 0",
                            backgroundColor: "#4D94FF",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                            boxShadow: "0 2px 4px rgba(77,148,255,0.2)",
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProducts;