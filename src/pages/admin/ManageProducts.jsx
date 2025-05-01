    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { getAllProducts, deleteProduct } from "../../services/productService";
    import "../../styles/AdminProducts.css";

    export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
        const data = await getAllProducts();
        setProducts(data);
        } catch (err) {
        console.error("Failed to fetch products:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProduct(id, token);
            fetchProducts();
        } catch (err) {
            console.error("Failed to delete product:", err);
        }
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-products container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="admin-title">🛒 Manage Products</h2>
            <Link to="/admin/products/add" className="btn btn-success">
            ➕ Add Product
            </Link>
        </div>

        <input
            type="text"
            placeholder="Search products..."
            className="form-control mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-responsive">
            <table className="table table-hover align-middle">
            <thead>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map((product) => (
                <tr key={product._id}>
                    <td>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        className="rounded"
                    />
                    </td>
                    <td>{product.name}</td>
                    <td>₪{product.price}</td>
                    <td>{product.size}</td>
                    <td>{product.color}</td>
                    <td>
                    <span className={`badge bg-${product.status === "new" ? "success" : "secondary"}`}>
                        {product.status}
                    </span>
                    </td>
                    <td>{product.inStock ? "✅" : "❌"}</td>
                    <td>
                    <div className="d-flex gap-2">
                        <Link to={`/admin/products/edit/${product._id}`} className="btn btn-sm btn-primary">
                        Edit
                        </Link>
                        <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id)}
                        >
                        Delete
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
