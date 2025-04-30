    import { useEffect, useState } from "react";
    import {
    fetchCategories,
    addCategory,
    deleteCategory,
    } from "../../services/categoryService";
    import "../../styles/AdminTables.css";

    export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
        const token = localStorage.getItem("token");
        const data = await fetchCategories(token);
        setCategories(data);
        } catch (err) {
        console.error("Failed to fetch categories:", err);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
        const token = localStorage.getItem("token");
        const newCategory = await addCategory(name, token);
        setCategories((prev) => [...prev, newCategory]);
        setName("");
        } catch (err) {
        console.error("Failed to add category:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
        const token = localStorage.getItem("token");
        await deleteCategory(id, token);
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        } catch (err) {
        console.error("Failed to delete category:", err);
        }
    };

    return (
        <div className="admin-orders-page container py-5">
        <h2 className="orders-title">🏷️ Manage Categories</h2>

        <form className="add-category-form" onSubmit={handleAddCategory}>
            <div className="d-flex gap-3 mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="add-btn">
                Add
            </button>
            </div>
        </form>

        <div className="table-responsive">
            <table className="orders-table">
            <thead>
                <tr>
                <th>Category Name</th>
                <th>Created At</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.length === 0 ? (
                <tr>
                    <td colSpan="3">No categories found.</td>
                </tr>
                ) : (
                categories.map((cat) => (
                    <tr key={cat._id}>
                    <td data-label="Name">{cat.name}</td>
                    <td data-label="Created">
                        {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td data-label="Actions">
                        <button
                        className="edit-status-btn"
                        onClick={() => handleDelete(cat._id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
