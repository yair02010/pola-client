    import api from "./api";
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const getAdminSummaryData = async (token) => {
    const [productsRes, ordersRes, usersRes] = await Promise.all([
        api.get("/products"),
        api.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/users/all", { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    return {
        products: productsRes.data,
        orders: ordersRes.data,
        users: usersRes.data,
    };
    };
