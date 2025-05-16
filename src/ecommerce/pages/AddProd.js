
import React, { useState } from "react";
import api from "../../api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    usp: "",
    description: "",
    imageUrl: "",
    price: "",
    quantity: "",
    merchantId: sessionStorage.getItem("merchantId"),
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in product) {
      if (!product[key]) {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }
    if (parseFloat(product.price) < 0) {
      alert("❌ Price cannot be negative.");
      return;
    }

    if (parseInt(product.quantity) < 0) {
      alert("❌ Quantity cannot be negative.");
      return;
    }

    const productData = {
      name: product.name,
      type: product.type,
      usp: product.usp,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,

      merchants: [
        {
          merchantId: product.merchantId,
          price: product.price,
          stock: parseInt(product.quantity, 10),
        },
      ],
    };

    try {
      const response = await api.post(
        `/products/add?merchantId=${product.merchantId}`,
        productData
      );
      if (response.status === 200) {
        alert("✅ Product added successfully!");
        setProduct({
          name: "",
          type: "",
          usp: "",
          description: "",
          imageUrl: "",
          price: "",
          quantity: "",
          merchantId: sessionStorage.getItem("merchantId"),
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {[
            "name",
            "type",
            "usp",
            "description",
            "imageUrl",
            "price",
            "quantity",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={product[field]}
              onChange={handleChange}
              style={styles.input}
              required
            />
          ))}

          <button type="submit" style={styles.button}>
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(to right, #e0f7fa, #ffffff)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2.5rem",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "1.25rem",
    boxShadow: "0 0.375rem 1.125rem rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "31.25rem",
  },
  title: {
    marginBottom: "1.875rem",
    fontSize: "1.5rem",
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "0.875rem",
    marginBottom: "0.9375rem",
    borderRadius: "0.625rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "0.875rem",
    backgroundColor: "#28a745",
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "0.625rem",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "0.625rem",
    transition: "background-color 0.3s",
  },
};

export default AddProduct;
