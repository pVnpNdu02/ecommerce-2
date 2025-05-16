// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const ViewOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const merchantId = sessionStorage.getItem("merchantId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!merchantId) {
//       alert("Login required!");
//       navigate("/login");
//       return;
//     }

//     fetch(`http://localhost:8080/orders/merchant/${merchantId}`)

//     .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         setError("Error loading orders.");
//         setLoading(false);
//       });
//   }, [merchantId, navigate]);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🧾 Your Orders</h2>

//       {loading && <p>Loading orders...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {orders.length > 0 ? (
//         orders.map((order) => (
//           <div key={order._id} style={styles.card}>
//             <h3>📦 {order.productName}</h3>
//             <p><b>Status:</b> {order.status}</p>
//             <p><b>Quantity:</b> {order.quantity}</p>
//             <p><b>Total:</b> ₹{order.price}</p>
//             <hr />
//             <p><b>Buyer Email:</b> {order.buyerEmail}</p>
//             <p><b>Address:</b> {order.deliveryAddress}, {order.city}, {order.state} - {order.zipCode}</p>
//             <p><b>Phone:</b> {order.phoneNumber}</p>
//           </div>
//         ))
//       ) : (
//         <p>No orders placed yet.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "30px",
//     fontFamily: "Segoe UI, sans-serif",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   title: {
//     textAlign: "center",
//     color: "#007bff",
//     marginBottom: "20px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     marginBottom: "20px",
//   },
// };

// export default ViewOrdersPage;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ViewOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const merchantId = sessionStorage.getItem("merchantId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!merchantId) {
//       alert("Login required!");
//       navigate("/login");
//       return;
//     }

//     fetch(`http://localhost:8080/orders/merchant/${merchantId}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         setError("Error loading orders.");
//         setLoading(false);
//       });
//   }, [merchantId, navigate]);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🧾 Your Orders</h2>

//       {loading && <p>Loading orders...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {orders.length > 0 ? (
//         orders.map((order) => (
//           <div key={order.orderId} style={styles.card}>
//             {order.items.map((item, index) => (
//               <div key={index}>
//                 <h3>📦 {item.productName || "Product Name Unavailable"}</h3>
//                 <p><b>Status:</b> {order.status}</p>
//                 <p><b>Quantity:</b> {item.quantity}</p>
//                 <p><b>Total:</b> ₹{item.quantity * item.price}</p>
//                 <hr />
//               </div>
//             ))}
//             <p><b>Buyer Email:</b> {order.buyerEmail}</p>
//             <p><b>Address:</b> {order.deliveryAddress}, {order.city}, {order.state} - {order.zipCode}</p>
//             <p><b>Phone:</b> {order.phoneNumber}</p>
//           </div>
//         ))
//       ) : (
//         <p>No orders placed yet.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "30px",
//     fontFamily: "Segoe UI, sans-serif",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   title: {
//     textAlign: "center",
//     color: "#007bff",
//     marginBottom: "20px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     marginBottom: "20px",
//   },
// };

// export default ViewOrdersPage;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ViewOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const merchantId = sessionStorage.getItem("merchantId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!merchantId) {
//       alert("Login required!");
//       navigate("/login");
//       return;
//     }

//     fetch(`http://localhost:8080/orders/merchant/${merchantId}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         setError("Error loading orders.");
//         setLoading(false);
//       });
//   }, [merchantId, navigate]);

//   return (
//     <div style={{
//       background: "linear-gradient(135deg, #e8f4f8 0%, #d1e6f0 100%)",
//       minHeight: "100vh",
//       padding: "40px 20px",
//       fontFamily: "Segoe UI, sans-serif",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>
//       <div style={{
//         width: "100%",
//         maxWidth: "800px",
//         backgroundColor: "#ffffff",
//         borderRadius: "16px",
//         boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//         padding: "30px",
//       }}>
//         <h2
//           style={{
//             textAlign: "center",
//             fontSize: "28px",
//             fontWeight: "600",
//             marginBottom: "24px",
//             color: "#333",
//             borderBottom: "3px solid #4D94FF",
//             paddingBottom: "8px",
//             display: "inline-block",
//             position: "relative",
//             left: "15%",
//             transform: "translateX(-50%)"
//           }}
//         >
//           🧾 View Orders
//         </h2>

//         {loading && <p>Loading orders...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order.orderId} style={styles.card}>
//               {order.items.map((item, index) => (
//                 <div key={index}>
//                   <h3>📦 {item.productName || "Product Name Unavailable"}</h3>
//                   <p><b>Status:</b> {order.status}</p>
//                   <p><b>Quantity:</b> {item.quantity}</p>
//                   <p><b>Total:</b> ₹{item.quantity * item.price}</p>
//                   <hr />
//                 </div>
//               ))}
//               <p><b>Buyer Email:</b> {order.buyerEmail}</p>
//               <p><b>Address:</b> {order.deliveryAddress}, {order.city}, {order.state} - {order.zipCode}</p>
//               <p><b>Phone:</b> {order.phoneNumber}</p>
//             </div>
//           ))
//         ) : (
//           <p>No orders placed yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     marginBottom: "20px",
//   },
// };

// export default ViewOrdersPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const merchantId = sessionStorage.getItem("merchantId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!merchantId) {
      alert("Login required!");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/orders/merchant/${merchantId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Error loading orders.");
        setLoading(false);
      });
  }, [merchantId, navigate]);

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
        maxWidth: "900px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 6px 30px rgba(0, 0, 0, 0.1)",
        padding: "30px 40px",
        textAlign: "center", // Center all text
      }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700", // Bold text
            marginBottom: "30px",
            color: "#333",
            borderBottom: "4px solid #4D94FF",
            paddingBottom: "10px",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          🧾 View Orders
        </h2>

        {loading && <p style={{ fontWeight: "600", marginBottom: "10px" }}>Loading orders...</p>} {/* Added margin for spacing */}
        {error && <p style={{ color: "red", fontWeight: "600", marginBottom: "10px" }}>{error}</p>} {/* Added margin for spacing */}

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} style={styles.card}>
              {order.items.map((item, index) => (
                <div key={index} style={{ textAlign: "center", marginBottom: "20px" }}> {/* Added marginBottom for spacing */}
                  <h3 style={{ color: "#007bff", fontWeight: "700", marginBottom: "10px" }}>📦 {item.productName || "Product Name Unavailable"}</h3> {/* Added margin */}
                  <p style={{ marginBottom: "8px" }}><b>Status:</b> {order.status}</p> {/* Added margin */}
                  <p style={{ marginBottom: "8px" }}><b>Quantity:</b> {item.quantity}</p> {/* Added margin */}
                  <p style={{ marginBottom: "8px" }}><b>Total:</b> ₹{item.quantity * item.price}</p> {/* Added margin */}
                  <hr />
                </div>
              ))}
              <p style={{ marginBottom: "8px" }}><b>Buyer Email:</b> {order.buyerEmail}</p> {/* Added margin */}
              <p style={{ marginBottom: "8px" }}><b>Address:</b> {order.deliveryAddress}, {order.city}, {order.state} - {order.zipCode}</p> {/* Added margin */}
              <p style={{ marginBottom: "8px" }}><b>Phone:</b> {order.phoneNumber}</p> {/* Added margin */}
            </div>
          ))
        ) : (
          <p style={{ fontWeight: "600", marginTop: "20px" }}>No orders placed yet.</p> 
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center", // Ensure all the content inside the card is centered
  },
};

export default ViewOrdersPage;
