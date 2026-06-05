import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const STORAGE_KEY = "bmm_auth";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return config;
});

export const getHeroBanners = () => api.get("/api/herobanners");
export const getAllHeroBanners = () => api.get("/api/herobanners/all");
export const addHeroBanner = (data) => api.post("/api/herobanners", data);
export const deleteHeroBanner = (id) => api.delete(`/api/herobanners/${id}`);

export const signupUser = (data) => api.post("/api/users/signup", data);
export const loginUser = (data) => api.post("/api/users/login", data);
export const getMe = () => api.get("/api/users/me");
export const getUsers = () => api.get("/api/users");

export default api;
