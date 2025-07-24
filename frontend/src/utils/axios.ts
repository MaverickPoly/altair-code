// utils/axios.ts
import axios from "axios";
import { getRefreshToken, setTokens, clearTokens } from "./tokenStorage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Attach access token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("accessToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auto‑refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && getRefreshToken()) {
      console.log("AXIOS refreshing!");
      try {
        const r = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "token/refresh/",
          { refresh: getRefreshToken() },
        );
        setTokens(r.data.access, r.data.refresh);
        err.config.headers.Authorization = `Bearer ${r.data.access}`;
        return api.request(err.config); // retry
      } catch {
        clearTokens();
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(err);
  },
);
