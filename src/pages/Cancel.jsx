    import { Link } from "react-router-dom";

    export default function Cancel() {
    return (
        <div className="container py-5 text-center">
        <div className="d-inline-block bg-light shadow rounded-4 p-5">
            <div className="mb-4">
            <span style={{ fontSize: "4rem" }}>❌</span>
            </div>
            <h2 className="fw-bold text-danger mb-3">Payment Canceled</h2>
            <p className="mb-3 fs-5">It seems your payment didn’t go through.</p>
            <p className="mb-4 text-muted">You can try again or return to your cart to make changes.</p>

            <Link to="/cart" className="btn btn-outline-danger px-4 py-2 fw-bold">
            🔁 Back to Cart
            </Link>
        </div>
        </div>
    );
    }
