import axios from "axios";

// Base URL config (change the port if your backend runs differently)
const api = axios.create({
  baseURL: "http://localhost:8080", // For product microservice
});

export default api;
