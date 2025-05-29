    import { useCart } from "../contexts/CartContext";
    import { Link } from "react-router-dom";
    import "../styles/Cart.css";

    export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
        <section className="cart-page empty-cart">
            <div className="container">
            <h2>🛍️ Your Shopping Cart</h2>
            <p>Your cart is currently empty.</p>
            <Link to="/shop" className="btn-back-to-shop">
                Back to Shop
            </Link>
            </div>
        </section>
        );
    }

    return (
        <section className="cart-page">
        <div className="container">
            <h2>🛍️ Your Shopping Cart</h2>
            <div className="cart-list">
            {cart.map((item) => (
                <div key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Price: ₪{item.price}</p>
                    <label>
                    Quantity:
                    <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    >
                        {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                        ))}
                    </select>
                    </label>
                    <p>Total: ₪{item.price * item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                    ✖
                </button>
                </div>
            ))}
            <div className="cart-total">
                <h3>Total: ₪{total}</h3>
                <Link to="/checkout" className="btn-checkout">
                Proceed to Checkout
                </Link>
            </div>
            </div>
        </div>
        </section>
    );
    }
