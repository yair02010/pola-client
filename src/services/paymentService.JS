    import api from "./api";

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    export const createStripeSession = async (orderData, token) => {
    const res = await api.post(`${API}/payments/checkout`, orderData, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
    };
