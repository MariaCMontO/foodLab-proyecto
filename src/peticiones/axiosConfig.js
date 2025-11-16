import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/foodlab",
});

// Interceptor que añade el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token.length > 20) {
  config.headers.Authorization = `Bearer ${token}`;
}

  return config;
});

export default api;