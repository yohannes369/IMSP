import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // for cookies and auth tokens
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient; // <-- This must be here
