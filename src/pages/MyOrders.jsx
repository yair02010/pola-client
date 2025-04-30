    import { useEffect, useState } from "react";
    import { getMyOrders } from "../services/orderService";

    export default function MyOrders() {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await getMyOrders(token);
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setOrders([]);
        }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container py-5">
        <h2 className="fw-bold mb-4">🧾 My Orders</h2>

        {!Array.isArray(orders) ? (
            <p>Loading...</p>
        ) : orders.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            <div className="table-responsive">
            <table className="table table-striped align-middle">
                <thead className="table-light">
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>₪{order.totalAmount}</td>
                    <td>
                        <span
                        className={`badge bg-${order.status === "paid" ? "success" : "secondary"}`}
                        >
                        {order.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
    }
