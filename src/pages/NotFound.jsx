    import { Link } from "react-router-dom";

    export default function NotFound() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-4 text-muted">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-dark px-4 mt-3">
            ← Back to Home
        </Link>
        </div>
    );
    }
