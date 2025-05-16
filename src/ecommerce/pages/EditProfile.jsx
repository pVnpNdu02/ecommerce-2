

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    role: "",
    password: "",
    merchantId: "",
  });

  useEffect(() => {
    const userDetails = {
      _id: sessionStorage.getItem("_id"),
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      phone: sessionStorage.getItem("phone"),
      address: sessionStorage.getItem("address"),
      city: sessionStorage.getItem("city"),
      state: sessionStorage.getItem("state"),
      zipCode: sessionStorage.getItem("zipCode"),
      country: sessionStorage.getItem("country"),
      role: sessionStorage.getItem("role"),
      password: sessionStorage.getItem("password"),
      merchantId: sessionStorage.getItem("merchantId"),
    };
    setProfile(userDetails);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, address, city, state, zipCode, country } = profile;

    const nameRegex = /^[A-Za-z0-9_]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Ensure phone is numeric and 10 digits long
    const passwordRegex = /^[A-Za-z0-9_@$_]+$/;
    const zipCodeRegex = /^\d{5}$/; // Validate zip code to be numeric and exactly 5 digits

    if (!nameRegex.test(name)) {
      alert("Username must be at least 5 characters and can include alphanumericals and _ ");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits and numerics only.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be alphanumeric and can only contain _ @ $");
      return;
    }
    if (!zipCodeRegex.test(zipCode)) {
      alert("Zip code must be  numeric.");
      return;
    }
    if (!city || !state || !address || !zipCode || !country) {
      alert("Please fill in all the required address fields.");
      return;
    }

    // Check if the phone number is already in use by another user
    const phoneExists = await checkPhoneExists(phone);
    if (phoneExists) {
      alert("Phone number is already registered for another merchant.");
      return;
    }

    try {
      const updatedProfile = { name, email, phone, address, city, state, zipCode, country, password };

      const response = await fetch(`http://localhost:8080/users/merchant/${profile.merchantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("address", address);
        sessionStorage.setItem("city", city);
        sessionStorage.setItem("state", state);
        sessionStorage.setItem("zipCode", zipCode);
        sessionStorage.setItem("country", country);
        sessionStorage.setItem("password", password);

        alert("Profile updated successfully!");
        navigate("/merchant-profile");
      } else {
        const errorMsg = await response.text();
        alert(`Failed to update profile: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    }
  };

  const checkPhoneExists = async (phone) => {
    try {
      const response = await fetch("http://localhost:8080/users/checkPhone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          role: "merchant", // assuming role is always 'merchant' for this check
        }),
      });

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking phone existence:", error);
      return false;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Profile</h2>

        {/* Full Name */}
        <label style={styles.label}>
          Name <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        {/* Email */}
        <label style={styles.label}>
          Email <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        {/* Phone Number */}
        <label style={styles.label}>
          Phone Number <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        {/* Address */}
        <label style={styles.label}>
          Address <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        />

        {/* City */}
        <label style={styles.label}>
          City <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.city}
          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
        />

        {/* State */}
        <label style={styles.label}>
          State <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.state}
          onChange={(e) => setProfile({ ...profile, state: e.target.value })}
        />

        {/* Zip Code */}
        <label style={styles.label}>
          Zip Code <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.zipCode}
          onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
        />

        {/* Country */}
        <label style={styles.label}>
          Country <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="text"
          value={profile.country}
          onChange={(e) => setProfile({ ...profile, country: e.target.value })}
        />
        <label style={styles.label}>
          Password <span style={styles.asterisk}>*</span>
        </label>
        <input
          style={styles.input}
          type="password"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />

        {/* Save Button */}
        <button style={styles.button} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: '2rem',
  },
  container: {
    width: '30rem',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '1rem',
    display: 'block',
    fontSize: '1rem',
  },
  asterisk: {
    color: 'red',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    marginTop: '2rem',
    cursor: 'pointer',
  },
};

export default EditProfile;
