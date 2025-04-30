    import { useEffect, useState } from "react";
    import { useParams, Link } from "react-router-dom";
    import { Container, Table, Spinner } from "react-bootstrap";
    import { getOrderById } from "../services/orderService";

    export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await getOrderById(id, token);
            setOrder(data);
        } catch (err) {
            console.error("Failed to fetch order:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
        <Container className="py-5 text-center">
            <Spinner animation="border" variant="primary" />
        </Container>
        );
    }

    if (!order) {
        return (
        <Container className="py-5 text-center">
            <h3 className="text-danger">Order not found.</h3>
        </Container>
        );
    }

    const {
        _id,
        createdAt,
        status,
        totalAmount,
        user,
        deliveryMethod,
        paymentMethod,
        shippingAddress,
        items,
    } = order;

    const formatAddress = () => {
        if (!shippingAddress || !shippingAddress.city) return "—";
        return `${shippingAddress.street || ""} ${shippingAddress.houseNumber || ""}, ${shippingAddress.city || ""} ${shippingAddress.zipCode || ""}`;
    };

    return (
        <Container className="py-5">
        <h2 className="fw-bold mb-4">📄 Order Details</h2>

        <p><strong>Order ID:</strong> {_id}</p>
        <p><strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Total:</strong> ₪{totalAmount}</p>

        <hr />

        <h5>👤 Customer:</h5>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>

        <h5 className="mt-4">📦 Delivery Method:</h5>
        <p>{deliveryMethod === "pickup" ? "Pickup from Store" : "Home Delivery"}</p>

        {deliveryMethod === "delivery" && (
            <>
            <h5 className="mt-3">🏠 Shipping Address:</h5>
            <p>{formatAddress()}</p>
            </>
        )}

        <h5 className="mt-3">💳 Payment Method:</h5>
        <p>
            {paymentMethod === "credit_card"
            ? "Credit Card (Stripe)"
            : paymentMethod === "cash_in_store"
            ? "Cash in Store"
            : "Cash on Delivery"}
        </p>

        <h4 className="mt-4">🛍 Items:</h4>
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price (₪)</th>
                <th>Total (₪)</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>
                    <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                    />
                </td>
                <td>{item.quantity}</td>
                <td>₪{item.price}</td>
                <td>₪{item.price * item.quantity}</td>
                </tr>
            ))}
            </tbody>
        </Table>

        <div className="text-center mt-4">
            <Link to="/my-orders" className="btn btn-outline-primary">
            🔙 Back to My Orders
            </Link>
        </div>
        </Container>
    );
    }
