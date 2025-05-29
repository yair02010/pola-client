    import { useEffect, useState } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import { fetchProfile, updateProfile, fetchMyOrders } from "../services/userService";
    import { useCart } from "../contexts/CartContext";
    import { motion } from "framer-motion";
    import { toast } from "react-toastify";
    import * as Yup from "yup";
    import "../styles/Profile.css";

    export default function Profile() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [orders, setOrders] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadData = async () => {
        try {
            const profile = await fetchProfile();
            const orderData = await fetchMyOrders();
            setUser(profile);
            setOrders(orderData);
        } catch (err) {
            console.error("Failed loading profile/orders:", err);
        }
        };
        loadData();
    }, []);

    const profileSchema = Yup.object().shape({
        name: Yup.string().min(2).max(100).required(),
        email: Yup.string().email().required(),
        phone: Yup.string().nullable(),
        city: Yup.string().nullable(),
        street: Yup.string().nullable(),
        houseNumber: Yup.string().nullable(),
        floor: Yup.string().nullable(),
        apartment: Yup.string().nullable(),
        entrance: Yup.string().nullable(),
        zipCode: Yup.string().nullable(),
    });

    if (!user) return <div className="profile-page container py-5">Loading profile...</div>;

    return (
        <div className="profile-page container">
        <h2 className="profile-title">👤 My Profile</h2>

        {!editMode ? (
            <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>City:</strong> {user.address?.city}</p>
            <p><strong>Street:</strong> {user.address?.street}</p>
            <p><strong>House Number:</strong> {user.address?.houseNumber}</p>
            <p><strong>Floor:</strong> {user.address?.floor}</p>
            <p><strong>Apartment:</strong> {user.address?.apartment}</p>
            <p><strong>Entrance:</strong> {user.address?.entrance}</p>
            <p><strong>Zip Code:</strong> {user.address?.zipCode}</p>

            <button onClick={() => setEditMode(true)} className="btn-edit mt-3">Edit Profile</button>
            </div>
        ) : (
            <Formik
            initialValues={{
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                city: user.address?.city || "",
                street: user.address?.street || "",
                houseNumber: user.address?.houseNumber || "",
                floor: user.address?.floor || "",
                apartment: user.address?.apartment || "",
                entrance: user.address?.entrance || "",
                zipCode: user.address?.zipCode || "",
            }}
            validationSchema={profileSchema}
            onSubmit={async (values) => {
                try {
                const updated = await updateProfile(values);
                setUser(updated);
                setEditMode(false);
                toast.success("Profile updated successfully 🎉");
                } catch (err) {
                console.error("Update failed", err);
                toast.error("Failed to update profile ❌");
                }
            }}
            >
            {({ resetForm }) => (
                <Form className="profile-card profile-form">
                {/* All input fields */}
                <div className="mb-3">
                    <label>Name</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="text-danger small" />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <Field name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <Field name="phone" className="form-control" />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                    <label>City</label>
                    <Field name="city" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                    <label>Street</label>
                    <Field name="street" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                    <label>House Number</label>
                    <Field name="houseNumber" className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                    <label>Floor</label>
                    <Field name="floor" className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                    <label>Apartment</label>
                    <Field name="apartment" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                    <label>Entrance</label>
                    <Field name="entrance" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                    <label>Zip Code</label>
                    <Field name="zipCode" className="form-control" />
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <button type="submit" className="btn-save">Save Changes</button>
                    <button type="button" className="btn-cancel" onClick={() => { resetForm(); setEditMode(false); toast.info("Changes canceled 🛑"); }}>
                    Cancel
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        )}

        <h4 className="section-title mt-5">📦 My Orders</h4>

        {orders.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            orders.map((order, i) => (
            <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="order-card"
            >
                <div className="card-header d-flex justify-content-between align-items-center">
                <div><strong>Order:</strong> #{order._id.slice(-6)}</div>
                <div>
                    <span className={`badge bg-${order.status === "paid" ? "success" : "secondary"} me-2`}>
                    {order.status}
                    </span>
                    <span className="badge bg-info">
                    {order.shippingStatus || "processing"}
                    </span>
                </div>
                </div>
                <div className="card-body">
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ₪{order.total}</p>
                <table className="table table-sm profile-order-table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.items.map((item, j) => (
                        <tr key={j}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₪{item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="btn-reorder mt-2" onClick={() => {
                    order.items.forEach((item) => addToCart({ ...item.product, quantity: item.quantity }));
                }}>
                    🛒 Reorder
                </button>
                </div>
            </motion.div>
            ))
        )}
        </div>
    );
    }
