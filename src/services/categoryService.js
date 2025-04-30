    import api from "./api";
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const fetchCategories = async (token) => {
    const res = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const addCategory = async (name, token) => {
    const res = await api.post("/categories", { name }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const deleteCategory = async (id, token) => {
    await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    };
