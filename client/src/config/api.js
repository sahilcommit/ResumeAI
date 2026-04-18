import axios from "axios";
import { store } from "../app/store.js";
import { logout } from "../app/features/authSlice.js";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
});

// Central axios instance keeps auth handling in one place
// so page/components do not need to repeat the same boilerplate.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If backend says token is unauthorized, sync both Redux + local storage.
      // This avoids the UI thinking the user is still logged in.
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default api;
