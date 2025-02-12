import axios from "axios";
import router from "../router"; // Import Vue Router
import { toast } from "vue3-toastify";

const timeout = 60000;
const baseUrlDev = "http://localhost:3000";
const baseUrlProd = "https://press-api.nixonanalytics.com";

const baseURL = baseUrlProd;

// ✅ Function to get the latest token dynamically
const getToken = () => localStorage.getItem("X-Pressbox-Token");

// ✅ Axios Instance
const Axios = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request Interceptor: Attach Token Before Sending Requests
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle 401 Errors
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired. Please log in again."); // Show toast
      localStorage.removeItem("X-Pressbox-Token"); // Clear token
      router.push("/"); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export { Axios };
