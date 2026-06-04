import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

export const getHeroBanners = () => api.get("/api/herobanners");
export const getAllHeroBanners = () => api.get("/api/herobanners/all");
export const addHeroBanner = (data) => api.post("/api/herobanners", data);
export const deleteHeroBanner = (id) => api.delete(`/api/herobanners/${id}`);

export default api;
