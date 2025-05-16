import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const email = sessionStorage.getItem("email");

  if (!email) {
    alert("No authentication found. Please log in.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
