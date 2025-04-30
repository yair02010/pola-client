    import api from "./api";

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const config = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    });

    export const fetchWishlist = async () => {
    const res = await api.get(`${API}/users/wishlist`, config());
    return res.data;
    };

    export const removeFromWishlist = async (productId) => {
    await api.delete(`${API}/users/wishlist/${productId}`, config());
    };

    export const getMyProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const updateProfile = async (profileData) => {
    const token = localStorage.getItem("token");
    const res = await api.put(`${API}/auth/profile`, profileData, {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });
    return res.data;
    };

    export const fetchMyOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get(`${API}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const deleteUserById = async (userId, token) => {
    await api.delete(`${API}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    };

    export const fetchAllUsers = async (token) => {
    const res = await api.get(`${API}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const toggleWishlist = async (productId, token) => {
    const res = await api.post(
        `${API}/users/wishlist`,
        { productId },
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        }
    );
    return res.data;
    };

    export const getMyOrders = async (token) => {
    const res = await api.get(`${API}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const getOrderById = async (orderId, token) => {
    const res = await api.get(`${API}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const createOrder = async (orderData, token) => {
    const res = await api.post(`${API}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const fetchOrders = async (token) => {
    const res = await api.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };

    export const updateOrderStatus = async (id, status, token) => {
    await api.put(`${API}/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    };

    export const createStripeSession = async (orderData, token) => {
    const res = await api.post(`${API}/payments/checkout`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    };
