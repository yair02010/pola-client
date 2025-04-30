    import api from "./api";
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const getAllProducts = async () => {
    const res = await api.get("/products");
    return res.data;
    };

    export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
    };

    export const createProduct = async (productData, token) => {
    const res = await api.post("/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const updateProduct = async (id, updatedData, token) => {
    const res = await api.put(`/products/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const deleteProduct = async (id, token) => {
    await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    };

    export const getAllCategories = async () => {
    const res = await api.get("/categories");
    return res.data;
    };
