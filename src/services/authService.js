    import api from "./api";
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const registerUser = async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
    };

    export const loginUser = async (userData) => {
    const res = await api.post("/auth/login", userData);
    return res.data;
    };

    export const getProfile = async (token) => {
    const res = await api.get("/auth/me", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
    };
