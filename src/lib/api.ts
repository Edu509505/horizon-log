import axios from "axios";
import { useAuth } from "../../states/userAuth";
const url = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
