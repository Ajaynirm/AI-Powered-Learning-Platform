import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL+"/api",
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});