import axios from "axios";

export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API_URL;
