import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MerchantProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",   
    state: "",
    zipcode: "",
    country: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const merchantId = sessionStorage.getItem("merchantId");
    const email = sessionStorage.getItem("email");

    if (merchantId) {
      fetchMerchantProfile(merchantId);
    } else if (email) {
      fetch(`http://localhost:8080/users/id-by-email/${email}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch merchantId. Status: ${res.status}`);
          return res.text();
        })
        .then((merchantId) => {
          if (!merchantId || merchantId === "User not found") {
            throw new Error("Invalid merchantId received.");
          }
          sessionStorage.setItem("merchantId", merchantId);
          return fetchMerchantProfile(merchantId);
        })
        .catch((err) => {
          console.error("Error:", err.message);
          alert(err.message || "Failed to fetch profile");
        });
    } else {
      alert("No authentication data found. Please log in again.");
    }

    function fetchMerchantProfile(merchantId) {
      fetch(`http://localhost:8080/users/merchant/${merchantId}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch merchant details. Status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setProfile({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            country: data.country,
          });
          sessionStorage.setItem("merchantName", data.name);
          sessionStorage.setItem("merchantPhone", data.phone);
          sessionStorage.setItem("merchantAddress", data.address);
          sessionStorage.setItem("merchantCity", data.city);
          sessionStorage.setItem("merchantState", data.state);
          sessionStorage.setItem("merchantZipcode", data.zipcode);
          sessionStorage.setItem("merchantCountry", data.country);

        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err.message);
          alert(err.message || "Failed to fetch merchant profile");
        });
    }
  }, []);

  const merchantId = sessionStorage.getItem("merchantId");  // Get the merchant ID from sessionStorage

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.contentWrapper}>
          <div style={styles.headerWrapper}>
            <h2 style={styles.header}>Merchant Profile</h2>
            <div style={styles.underline}></div>
          </div>
          <div style={styles.profileCard}>
            <p style={styles.profileInfo}><strong>Name:</strong> {profile.name}</p>
            <p style={styles.profileInfo}><strong>Email:</strong> {profile.email}</p>
            <p style={styles.profileInfo}><strong>Phone:</strong> {profile.phone}</p>
            <p style={styles.profileInfo}><strong>Address:</strong> {profile.address}</p>
            <p style={styles.profileInfo}><strong>City:</strong> {profile.city}</p>
            <p style={styles.profileInfo}><strong>State:</strong> {profile.state}</p>
            <p style={styles.profileInfo}><strong>Zipcode:</strong> {profile.zipcode}</p>
            <p style={styles.profileInfo}><strong>Country:</strong> {profile.country}</p>

            <p style={styles.profileInfo}><strong>Merchant ID:</strong> {merchantId}</p> {/* Display Merchant ID here */}

            <div style={styles.buttonContainer}>
              <button style={styles.button} onClick={() => navigate("/edit-profile")}>✏️ Edit Profile</button>
              <button style={styles.button} onClick={() => navigate("/merchant")}>🏠 Back to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  background: {
    background: "linear-gradient(to right, #4D94FF, #A6D4FF)", 
    width: "100%",
    height: "100%",
    padding: "5rem 0", 
  },
  contentWrapper: {
    width: "90%",
    maxWidth: "1100px", 
    margin: "0 auto",
    textAlign: "center",
  },
  headerWrapper: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#fff",
  },
  underline: {
    width: "6rem",
    height: "0.25rem",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    marginTop: "0.625rem",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    margin: "0 auto",
    width: "350px",
    textAlign: "left",
    marginBottom: "1.25rem",
  },
  profileInfo: {
    fontSize: "1.125rem",  // 18px
    marginBottom: "1.25rem",
    lineHeight: "1.6",
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    marginTop: "1.25rem",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "0.75rem 1.25rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0.3125rem",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "0.625rem",
    transition: "background-color 0.3s ease",
  },

  // Media Queries for Responsiveness
  "@media (max-width: 768px)": {
    header: {
      fontSize: "2rem",
    },
    profileCard: {
      width: "90%",
    },
    button: {
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
    },
    profileInfo: {
      fontSize: "1rem",
    },
  },

  "@media (max-width: 480px)": {
    container: {
      padding: "1rem",
    },
    header: {
      fontSize: "1.5rem",
    },
    profileCard: {
      width: "100%",
      padding: "1.5rem",
    },
    profileInfo: {
      fontSize: "0.875rem",
    },
    button: {
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
    },
  },
};

export default MerchantProfile;
