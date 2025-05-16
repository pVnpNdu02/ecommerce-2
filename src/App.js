
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SellerDashboard from "./ecommerce/pages/sellerPage";
import LoginPage from "./ecommerce/pages/LoginPage";
import RegisterPage from "./ecommerce/pages/RegistrationPage";
import AddProduct from "./ecommerce/pages/AddProd";
import ViewProductsPage from "./ecommerce/pages/ViewProd";
import UpdateProduct from "./ecommerce/pages/UpdateProd";
import MerchantProfile from "./ecommerce/pages/MerchantProfile";
import EditProfile from "./ecommerce/pages/EditProfile";
import ViewOrdersPage from "./ecommerce/pages/ViewOrders";  
import ForgotPassword from "./ecommerce/pages/ForgotPassword"; 
import ResetPassword from "./ecommerce/pages/ResetPassword";
import './index.css';

function App() {
  return (
    <MainLayout />
  );
}

// PrivateRoute Component to protect routes
function PrivateRoute({ children }) {
  const email = sessionStorage.getItem("email");

  if (!email) {
    alert("No authentication found. Please log in.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Main Layout where routing happens
function MainLayout() {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Merchant and User Dashboard Routes */}
        <Route
          path="/merchant"
          element={
            <PrivateRoute>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <SellerDashboard /> {/* Make sure you have UserDashboard component */}
            </PrivateRoute>
          }
        />
        
        {/* Merchant Operations Routes */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-products"
          element={
            <PrivateRoute>
              <ViewProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-orders"
          element={
            <PrivateRoute>
              <ViewOrdersPage />
            </PrivateRoute>
          }
        />

        {/* Product Update and Profile */}
        <Route
          path="/update-product/:id"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/merchant-profile"
          element={
            <PrivateRoute>
              <MerchantProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
