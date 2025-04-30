    import axios from "axios";

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const api = axios.create({
    baseURL: API,
    withCredentials: true,
    });

    export default api;
