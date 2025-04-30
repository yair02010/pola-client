    import api from "./api";

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const fetchProducts = async () => {
    const res = await api.get(`${API}/products`);
    return res.data;
    };

    export const fetchCategories = async () => {
    const res = await api.get(`${API}/categories`);
    return res.data;
    };
