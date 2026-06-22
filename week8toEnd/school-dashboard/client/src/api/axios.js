import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


let isRefreshing = false;

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
            return Promise.reject(error);
        }

        isRefreshing = true;

        try {
            const { data } = await api.post("auth/refresh");
            const newToken = data.access_token;
            localStorage.setItem("access_token", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            isRefreshing = false;
            return api(originalRequest);
        } catch (err) {
            localStorage.removeItem("access_token");
            return Promise.reject(err);
        }
    }

    return Promise.reject(error);
});