    import { Link } from "react-router-dom";
    import "../styles/Footer.css";

    export default function Footer() {
    return (
        <footer>
        <div className="container py-5">
            <div className="row align-items-start">
            {/* Brand */}
            <div className="col-md-4 mb-4">
                <h4>POLA</h4>
                <p>
                Boutique fashion. Quality second-hand clothing for all.
                <br />
                Sustainability with a personal touch 🌱
                </p>
            </div>

            {/* Links */}
            <div className="col-md-4 mb-4">
                <h6>Quick Links</h6>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/profile">My Account</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/return-policy">Return Policy</Link></li>
                </ul>
            </div>

            {/* Contact */}
            <div className="col-md-4 mb-4">
                <h6>Get in Touch</h6>
                <p>📍 Jerusalem, Israel</p>
                <p>✉️ contact@pola-store.com</p>
                <div className="social-icons">
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-whatsapp"></i></a>
                </div>
            </div>
            </div>

            <hr />
            <p className="copyright">
            © {new Date().getFullYear()} <strong>POLA</strong>. All rights reserved.
            </p>
        </div>
        </footer>
    );
    }
