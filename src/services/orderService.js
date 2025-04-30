import api from "./api";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getMyOrders = async (token) => {
    const res = await api.get(`${API}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const getOrderById = async (orderId, token) => {
    const res = await api.get(`${API}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const createOrder = async (orderData, token) => {
    const res = await api.post(`${API}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const fetchOrders = async (token) => {
    const res = await api.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const updateOrderStatus = async (id, status, paymentMethod, deliveryMethod, token) => {
    const res = await api.put(`${API}/orders/${id}/status`, { status, paymentMethod, deliveryMethod }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};
