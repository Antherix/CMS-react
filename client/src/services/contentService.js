import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/contents`,
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getContents = () => API.get("/");
export const createContent = (data) => API.post("/", data);
export const updateContent = (id, data) => API.put(`/${id}`, data);
export const deleteContent = (id) => API.delete(`/${id}`);