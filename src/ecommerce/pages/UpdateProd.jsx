import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const merchantId = sessionStorage.getItem("merchantId");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
   type: "",
    usp: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((product) => {
        const merchantData = product.merchants?.find(
          (mp) => String(mp.merchantId) === String(merchantId)
        );
        setData({
          name: product.name,
          description: product.description,
          price: merchantData?.price || "",
          quantity: merchantData?.stock  || "",
          type: product.type,
          usp: product.usp,
          imageUrl: product.imageUrl,
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Error fetching product");
      });
  }, [id, merchantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProduct = async () => {
    if (parseFloat(data.price) < 0 ) {
      alert("❌ Price  cannot be negative.");
      return;
    }
    if ( parseInt(data.quantity) < 0) {
      alert("❌ Quantity cannot be negative.");
      return;
    }
  
    try {
      const res = await fetch(
        `http://localhost:8080/products/update/${id}/${merchantId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            description: data.description,
            price: data.price,
            type: data.type,
            usp: data.usp,
            imageUrl: data.imageUrl,
            merchants: [
              {
                stock: data.quantity
              }
            ]
          }),
        }
      );
  
      if (res.ok) {
        alert("✅ Product updated!");
        navigate("/view-products");
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Update failed");
    }
  };
  

return (
  <div style={{
    background: "linear-gradient(135deg, #e8f4f8 0%, #d1e6f0 100%)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <div style={{
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      padding: "30px",
    }}>
     
     <h2
  style={{
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#333",
    borderBottom: "3px solid #4D94FF",
    paddingBottom: "8px",
    display: "inline-block",
    position: "relative",
    left: "15%",
    transform: "translateX(-50%)"
  }}
>
  🔄 Update Product
</h2>
      {/* Centered Image Container */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        width: "100%"
      }}>
        {data.imageUrl && (
          <div style={{
            height: "200px",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F9F9F9",
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
          }}>
            <img
              src={data.imageUrl}
              alt="Product"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain"
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}
      </div>
      
      {/* Form Fields */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Name
            </label>
            <input
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
                resize: "vertical",
                minHeight: "80px"
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Price
            </label>
            <input
              name="price"
              type="number"
              value={data.price}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              value={data.quantity}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Type
            </label>
            <input
              name="type"
              type="text"
              value={data.type}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              USP (Unique Selling Point)
            </label>
            <textarea
              name="usp"
              value={data.usp}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
                resize: "vertical",
                minHeight: "80px"
              }}
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "6px",
              color: "#555"
            }}>
              Image URL
            </label>
            <input
              name="imageUrl"
              type="text"
              value={data.imageUrl}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Update Button */}
      <div style={{ 
        marginTop: "30px", 
        display: "flex", 
        justifyContent: "center" 
      }}>
        <button
          onClick={updateProduct}
          style={{
            width: "50%",
            backgroundColor: "#4D94FF",
            color: "white",
            padding: "12px 16px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(77,148,255,0.2)",
            transition: "all 0.2s ease",
            fontSize: "16px"
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  </div>
);
}
export default UpdateProduct;
