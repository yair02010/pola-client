    import { useEffect, useState } from "react";
    import { useParams, Link } from "react-router-dom";
    import { useCart } from "../contexts/CartContext";
    import { toast } from "react-toastify";
    import { motion } from "framer-motion";
    import { FaShoppingCart } from "react-icons/fa";
    import { getProductById } from "../services/productService";
    import "../styles/ProductPage.css";

    export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (err) {
            console.error("Product not found:", err);
        }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart! ✅`);
    };

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <div className="product-page">
        <motion.div 
            className="product-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Image */}
            <div className="product-image-wrapper">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>

            {/* Info */}
            <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="product-details">
                <p><strong>Price:</strong> ₪{product.price}</p>
                <p><strong>Size:</strong> {product.size}</p>
                <p><strong>Color:</strong> {product.color}</p>
                <p><strong>Condition:</strong> {product.status}</p>
                <p><strong>In Stock:</strong> {product.inStock ? "Yes ✅" : "No ❌"}</p>
            </div>

            <div className="d-flex flex-column align-items-start mt-4">
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
                </button>

                <Link to="/shop" className="btn-back-shop">← Back to Shop</Link>
            </div>
            </div>
        </motion.div>
        </div>
    );
    }
