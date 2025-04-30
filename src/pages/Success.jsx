    import { useLocation, Link } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { getMyProfile } from "../services/userService";

    export default function Success() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const user = await getMyProfile();
            setUserName(user.name || "");
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        }
        };
        fetchUser();
    }, []);

    return (
        <div className="container py-5 text-center">
        <div className="d-inline-block bg-light shadow rounded-4 p-5">
            <div className="mb-4" style={{ fontSize: "4rem" }}>✅</div>
            <h2 className="fw-bold text-success mb-3">Payment Successful!</h2>
            <p className="mb-3 fs-5">
            Thank you {userName && <strong>{userName}</strong>} for your purchase 🎉
            </p>
            {orderId && (
            <p className="mb-4 fw-bold">
                🧾 <span className="text-muted">Order Number:</span>{" "}
                <span className="text-primary">{orderId}</span>
            </p>
            )}
            <Link to="/shop" className="btn btn-dark px-4 py-2 fw-bold">
            Continue Shopping
            </Link>
        </div>
        </div>
    );
    }
