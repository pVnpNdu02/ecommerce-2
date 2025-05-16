import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function RegisterPage() {
  // const _id = sessionStorage.getItem("_id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateName = (name) => /^[a-zA-Z0-9_]{5,}$/.test(name);
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^[a-zA-Z0-9@$_]{7,}$/.test(password);
  const containsEmoji = (str) => /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu.test(str);


  const checkPhoneExists = async (phone, role) => {
    try {
      const response = await fetch(`http://localhost:8080/users/checkPhone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to check phone number");
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking phone number:", error);
      setError("Error while checking phone number availability. Please try again.");
      return false;
    }
  };

  const handleRegister = async () => {
    if (containsEmoji(name)) {
      setError("Username cannot contain emojis or special characters.");
      return;
    }
    if (containsEmoji(phone)) {
      setError("Phone number cannot contain emojis.");
      return;
    }
    if (containsEmoji(zipCode)) {
      setError("Zip code cannot contain emojis or special characters.");
      return;
    }
    if (containsEmoji(city)) {
      setError("City cannot contain emojis.");
      return;
    }
  
    if (containsEmoji(state)) {
      setError("State cannot contain emojis.");
      return;
    }
  
    if (containsEmoji(address)) {
      setError("Address cannot contain emojis.");
      return;
    }
  
    if (containsEmoji(country)) {
      setError("Country cannot contain emojis.");
      return;
    }
   
    
    if (!validateName(name)) {
      setError("Username must be at least 5 characters and can include letters, numbers, _ or -.");
      return;
    }
    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 7 characters and include @ $ _.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!role) {
      setError("Please select a user type (Role).");
      return;
    }

    const phoneExists = await checkPhoneExists(phone, role);
    if (phoneExists) {
      setError("Phone number is already registered for this role.");
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:8080/register", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        
          name,
          email,
          password,
          role,
          merchantId: role === "merchant" ? merchantId : null,
          phone,
          address,
          city,
          state,
          zipCode,
          country,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        sessionStorage.setItem("_id", data._id);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("phone", data.phone);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("address", data.address);
        sessionStorage.setItem("city", data.city);
        sessionStorage.setItem("state", data.state);
        sessionStorage.setItem("zipCode", data.zipCode);
        sessionStorage.setItem("country", data.country);

        if (data.role === "merchant") {
          sessionStorage.setItem("merchantId", data.merchantId);
        }

        alert("Registration successful!");

        if (data.role === "merchant") {
          navigate("/merchant");
        } else {
          navigate("/user");
        }
      } else {
        const errorMsg = await response.text();
        alert("Registration failed: " + errorMsg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Server is down or unreachable.");
    }
  };
 
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
  
        {/* Full Name */}
        <label style={styles.label}>
          Name  <span style={styles.asterisk}>*</span>
        </label>
   
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
             <p style={styles.instruction}>At least 5 characters, alphanumeric and _  allowed</p>
  
        {/* Email */}
        <label style={styles.label}>
          Email <span style={styles.asterisk}>*</span>
        </label>
       
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        {/* Password */}
        <label style={styles.label}>
          Password <span style={styles.asterisk}>*</span>
        </label>
      <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>
        <p style={styles.instruction}>At least 7 characters, alphanumeric and @ $ & symbols</p>
        {/* Confirm Password */}
        <label style={styles.label}>
          Confirm Password <span style={styles.asterisk}>*</span>
        </label>
      
        <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            👁️
          </span>
        </div>
        <p style={styles.instruction}>Must match the above password </p>
  
        {/* Role */}
        <label style={styles.label}>
          Role <span style={styles.asterisk}>*</span>
        </label>
       
        <select
          style={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="user">End User</option>
          <option value="merchant">Merchant</option>
        </select>
  
        {/* Phone Number */}
        <label style={styles.label}>
          Phone Number <span style={styles.asterisk}>*</span>
        </label>
        <p style={styles.instruction}>Numeric only </p>
        <PhoneInput
          international
          defaultCountry="default"
          value={phone}
          onChange={setPhone}
          style={styles.input}
        />
  
        {/* Address */}
        <label style={styles.label}>
          Address <span style={styles.asterisk}>*</span>
        </label>
      
        <input
          style={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
  
        {/* City */}
        <label style={styles.label}>
          City <span style={styles.asterisk}>*</span>
        </label>
       
        <input
          style={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
  
        {/* State */}
        <label style={styles.label}>
          State <span style={styles.asterisk}>*</span>
        </label>
      
        <input
          style={styles.input}
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
  
        {/* Zip Code */}
        <label style={styles.label}>
          Zip Code <span style={styles.asterisk}>*</span>
        </label>
       
        <input
          style={styles.input}
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
         <p style={styles.instruction}>Numeric only</p>
  
        {/* Country */}
        <label style={styles.label}>
          Country <span style={styles.asterisk}>*</span>
        </label>
      
        <input
          style={styles.input}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
  
        {/* Register Button */}
        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
  }
  

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
    passwordWrapper: {
      position: 'relative',
    },
    eyeIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '1.2rem',
    },
    instruction: {
      fontSize: '0.9rem',
      color: '#777',
      marginBottom: '1rem',
      marginTop: '0.2rem',
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
    error: {
      color: 'red',
      marginBottom: '1rem',
      fontSize: '1rem',
      textAlign: 'center',
    },
  };
  
