    import { useEffect, useState } from "react"
    import { Link } from "react-router-dom"
    import { getAllProducts, deleteProduct } from "../../services/productService"
    import "../../styles/AdminProducts.css"

    export default function ManageProducts() {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
        const data = await getAllProducts()
        setProducts(data)
        } catch (err) {
        console.error("Failed to fetch products:", err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProduct(id, token)
            fetchProducts()
        } catch (err) {
            console.error("Failed to delete product:", err)
        }
        }
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

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

        <div className="product-grid">
            {paginatedProducts.map((product) => (
            <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-img" />
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">₪{product.price}</p>
                <p className="product-details">
                Size: {product.size} | Color: {product.color}
                </p>
                <div className="product-status">
                <span className={`status-badge ${product.status === "new" ? "bg-success" : "bg-secondary"}`}>
                    {product.status}
                </span>
                <span className="stock-icon">{product.inStock ? "✅ In Stock" : "❌ Out of Stock"}</span>
                </div>
                <div className="product-actions">
                <Link to={`/admin/products/edit/${product._id}`} className="btn btn-primary w-100 mb-2">
                    Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger w-100">
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>

        <div className="pagination-controls mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                className={`btn me-2 ${currentPage === i + 1 ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setCurrentPage(i + 1)}
            >
                {i + 1}
            </button>
            ))}
        </div>
        </div>
    )
    }
