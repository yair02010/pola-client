    import { useCart } from "../contexts/CartContext";
    import { Link } from "react-router-dom";
    import "../styles/Cart.css";

    export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="cart-page">
        <div className="container py-5">
            <h2 className="fw-bold text-center mb-4">🛍️ Your Shopping Cart</h2>

            {cart.length === 0 ? (
            <div className="empty-cart text-center">
                <p className="lead">Your cart is currently empty.</p>
                <Link to="/shop" className="btn-back-to-shop mt-3">
                Back to Shop
                </Link>
            </div>
            ) : (
            <div className="table-responsive shadow-sm rounded-4">
                <table className="table align-middle bg-white">
                <thead className="table-light">
                    <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                    <tr key={item._id}>
                        <td className="d-flex align-items-center gap-3">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="rounded-3"
                            style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            border: "1px solid #dee2e6",
                            }}
                        />
                        <div>
                            <h6 className="mb-0 fw-semibold">{item.name}</h6>
                        </div>
                        </td>
                        <td>
                        <select
                            className="form-select form-select-sm w-auto"
                            value={item.quantity}
                            onChange={(e) =>
                            updateQuantity(item._id, parseInt(e.target.value))
                            }
                        >
                            {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                            ))}
                        </select>
                        </td>
                        <td>₪{item.price}</td>
                        <td className="fw-bold">₪{item.price * item.quantity}</td>
                        <td>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item._id)}
                        >
                            ✖
                        </button>
                        </td>
                    </tr>
                    ))}

                    <tr className="table-light">
                    <td colSpan="3" className="text-end fw-bold fs-5">
                        Total:
                    </td>
                    <td className="fw-bold fs-5 text-success">₪{total}</td>
                    <td></td>
                    </tr>
                </tbody>
                </table>

                <div className="text-end mt-4">
                <Link to="/checkout" className="btn-checkout px-4 py-2 fw-bold">
                    Proceed to Checkout
                </Link>
                </div>
            </div>
            )}
        </div>
        </section>
    );
    }
