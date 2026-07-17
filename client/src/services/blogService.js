import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/contents`,
});

export const getPublishedPosts = () => API.get("/public");
export const getPublishedPostBySlug = (slug) => API.get(`/public/${slug}`);
