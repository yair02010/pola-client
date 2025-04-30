    import { useCart } from "../contexts/CartContext";
    import { Link } from "react-router-dom";
    import "../styles/miniCart.css";

    export default function MiniCart({ open, onClose }) {
    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!open) return null;

    return (
        <div className="mini-cart-overlay" onClick={onClose}>
        <div className="mini-cart" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>

            <h5 className="mini-cart-title">
            🛍️ Your Cart
            </h5>

            {cart.length === 0 ? (
            <p className="text-center text-muted mt-5">Your cart is empty.</p>
            ) : (
            <>
                <div className="mini-cart-items">
                {cart.map((item) => (
                    <div className="mini-cart-item" key={item._id}>
                    <img src={item.imageUrl} alt={item.name} className="mini-cart-img" />
                    <div className="mini-cart-details">
                        <div className="mini-cart-name">{item.name}</div>
                        <div className="mini-cart-price">₪{item.price} × {item.quantity}</div>
                    </div>
                    </div>
                ))}
                </div>

                <div className="mini-cart-total">
                <span>Total:</span>
                <strong>₪{total}</strong>
                </div>

                <div className="mini-cart-buttons">
                <Link to="/checkout" className="btn-proceed">
                    Proceed to Checkout
                </Link>
                <Link to="/cart" className="btn-view">
                    View Full Cart
                </Link>
                </div>
            </>
            )}
        </div>
        </div>
    );
    }
