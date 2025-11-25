import axios from "axios";
import { getToken } from "../utils/token";

const axiosClient = axios.create({
  baseURL: "https://sportify-khaki.vercel.app/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
