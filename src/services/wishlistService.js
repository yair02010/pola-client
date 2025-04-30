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
