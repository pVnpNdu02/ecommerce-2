import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/request-reset?email=${email}`, {
        method: "POST",
      });

      const text = await response.text();

      if (response.ok) {
        setMessage(text); // Success message
      } else {
        setMessage("User not found or error occurred.");
      }
    } catch (error) {
      setMessage("Server error.");
      console.error("Forgot Password Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleForgotPassword} style={{ padding: "10px", width: "100%" }}>
        Submit
      </button>
      {message && <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>}
    </div>
  );
};
export default ForgotPassword; // ✅ default export

