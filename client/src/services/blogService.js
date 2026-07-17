import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/contents",
});

export const getPublishedPosts = () => API.get("/public");
export const getPublishedPostBySlug = (slug) => API.get(`/public/${slug}`);
