    import { useEffect, useState } from "react";
    import { getAllProducts, getAllCategories } from "../services/productService";
    import ProductCard from "../components/ProductCard";
    import "../styles/Home.css";

    export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);

            const categoriesData = await getAllCategories();
            setCategories(categoriesData);
        } catch (err) {
            console.error("Error loading data:", err);
        }
        };

        fetchData();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : [];

    return (
        <div className="home-page">
        <section className="hero-section text-center">
            <div className="container hero-content">
            <span className="hero-badge">New Collection 2025</span>
            <h1 className="hero-title">Second-hand. First class.</h1>
            <p className="hero-subtitle">Vintage & curated fashion for every soul</p>
            <a href="/shop" className="btn btn-shop mt-3">Shop Now →</a>
            <ul className="hero-benefits">
                <li>♻️ Eco-Friendly</li>
                <li>🚚 Free Shipping</li>
                <li>✅ Quality Checked</li>
            </ul>
            </div>
        </section>

        <section className="category-section py-5">
            <div className="container">
            <h2 className="section-title text-center mb-5">Shop by Category</h2>
            <div className="row justify-content-center g-4">
                {categories.map((cat) => (
                <div key={cat._id} className="col-6 col-sm-4 col-md-3 text-center">
                    <div
                    className={`category-card ${selectedCategory === cat._id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat._id)}
                    style={{ cursor: "pointer" }}
                    >
                    <span>{cat.name}</span>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {selectedCategory && (
            <section className="filtered-products-section py-5 bg-light">
            <div className="container">
                <h2 className="section-title text-center mb-4">
                Products in "{categories.find(c => c._id === selectedCategory)?.name}"
                </h2>
                <div className="row">
                {filteredProducts.length === 0 ? (
                    <p className="text-center">No products in this category yet.</p>
                ) : (
                    filteredProducts.map((product) => (
                    <div key={product._id} className="col-md-3 col-sm-6 mb-4">
                        <ProductCard product={product} />
                    </div>
                    ))
                )}
                </div>
            </div>
            </section>
        )}

        <section className="featured-section py-5 bg-light">
            <div className="container">
            <h2 className="section-title text-center mb-5">🌟 Featured Items</h2>
            <div className="row">
                {products.slice(0, 4).map((product) => (
                <div key={product._id} className="col-md-3 col-sm-6 mb-4">
                    <ProductCard product={product} highlight />
                </div>
                ))}
            </div>
            </div>
        </section>

        <section className="mid-banner py-5 text-white text-center">
            <div className="container">
            <h2 className="banner-text">Sustainable. Affordable. Stylish.</h2>
            <p className="banner-sub">Join the fashion revolution today</p>
            </div>
        </section>

        <section className="testimonials-section py-5">
            <div className="container">
            <h2 className="section-title text-center mb-5">❤️ What Our Customers Say</h2>
            <div className="row justify-content-center g-4">
                <div className="col-md-4">
                <div className="testimonial-card">
                    <p>“Absolutely in love with the quality and feel of the clothes. I’ll be back!”</p>
                    <h6>- Liat B.</h6>
                </div>
                </div>
                <div className="col-md-4">
                <div className="testimonial-card">
                    <p>“Stylish, comfortable and eco-friendly – what more could you ask for?”</p>
                    <h6>- Dana T.</h6>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section className="newsletter-section py-5 bg-light">
            <div className="container text-center">
            <h2 className="section-title">Join Our Club</h2>
            <p>Get exclusive offers & style inspiration straight to your inbox</p>
            <form className="newsletter-form d-flex justify-content-center mt-3">
                <input type="email" className="form-control w-50 me-2" placeholder="Enter your email" />
                <button className="btn btn-dark">Subscribe</button>
            </form>
            </div>
        </section>
        </div>
    );
    }
