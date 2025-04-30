    import { useCart } from "../contexts/CartContext";
    import { Link, useNavigate } from "react-router-dom";
    import { useState, useEffect } from "react";
    import { FiUser, FiLogOut, FiHeart, FiShoppingBag, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
    import { MdAdminPanelSettings } from "react-icons/md";
    import { getProfile } from "../services/authService";
    import "../styles/Navbar.css";

    export default function Navbar() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        getProfile(token)
            .then((data) => setUser(data))
            .catch(() => setUser(null));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const getUserIcon = () => {
        if (!user) return <FiUser />;
        if (user.role === "admin") return <MdAdminPanelSettings />;
        return <FiUser />;
    };

    const handleMenuToggle = () => setMenuOpen(!menuOpen);
    const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="pola-navbar-wrapper">
        <nav className="pola-navbar container">
            <Link to="/" className="pola-logo" onClick={closeMenu}>
            <span className="gold-letter">P</span>OLA
            </Link>

            <button className="pola-toggle-menu" onClick={handleMenuToggle}>
            {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <ul className={`pola-nav-links ${menuOpen ? "open" : ""}`}>
            <li>
                <Link to="/shop" className="pola-link" onClick={closeMenu}>
                <FiShoppingBag /> Shop
                </Link>
            </li>
            {user && (
                <li>
                <Link to="/wishlist" className="pola-link" onClick={closeMenu}>
                    <FiHeart /> Wishlist
                </Link>
                </li>
            )}
            <li className="cart-icon">
                <Link to="/cart" className="pola-link" onClick={closeMenu}>
                <FiShoppingCart /> Cart
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Link>
            </li>

            {!user ? (
                <>
                <li>
                    <Link to="/login" className="pola-btn outline" onClick={closeMenu}>
                    Login
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="pola-btn filled" onClick={closeMenu}>
                    Register
                    </Link>
                </li>
                </>
            ) : (
                <li className="pola-user">
                <div onClick={handleDropdownToggle} className="dropdown-toggle">
                    {getUserIcon()} {user.name}
                </div>
                {dropdownOpen && (
                    <ul className="dropdown-menu open">
                    <li>
                        <Link to="/profile" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                        Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                        Wishlist
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                        My Cart
                        </Link>
                    </li>
                    {user.role === "admin" && (
                        <>
                        <hr />
                        <li>
                            <Link to="/admin/dashboard" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                            Admin Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                            Manage Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                            Manage Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                            Manage Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users" onClick={() => { closeMenu(); setDropdownOpen(false); }}>
                            Manage Users
                            </Link>
                        </li>
                        <hr />
                        </>
                    )}
                    <li>
                        <button onClick={() => { handleLogout(); closeMenu(); }}>
                        Logout
                        </button>
                    </li>
                    </ul>
                )}
                </li>
            )}
            </ul>
        </nav>
        </header>
    );
    }
