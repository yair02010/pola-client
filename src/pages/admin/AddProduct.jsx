    import { useNavigate } from "react-router-dom";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { toast } from "react-toastify";
    import { useEffect, useState } from "react";
    import "../../styles/AdminForms.css";

    import { fetchCategories } from "../../services/categoryService";
    import { createProduct } from "../../services/productService";

    const ProductSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(1).required("Price is required"),
    size: Yup.string().oneOf(["XS", "S", "M", "L", "XL"]).required("Size is required"),
    status: Yup.string().oneOf(["new", "used"]).required("Status is required"),
    color: Yup.string(),
    category: Yup.string().required("Category is required"),
    imageUrl: Yup.string().url("Invalid image URL"),
    });

    export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
        .then(setCategories)
        .catch((err) => console.error("Failed to load categories", err));
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
        const token = localStorage.getItem("token");
        await createProduct(values, token);
        toast.success("Product added successfully ✅");
        navigate("/admin/products");
        } catch (err) {
        console.error("Failed to add product", err);
        toast.error("Failed to add product ❌");
        setSubmitting(false);
        }
    };

    return (
        <div className="admin-form-page container py-5">
        <h2 className="admin-form-title">➕ Add New Product</h2>

        <Formik
            initialValues={{
            name: "",
            description: "",
            price: "",
            size: "M",
            status: "new",
            color: "",
            category: "",
            imageUrl: "",
            }}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
            <Form className="admin-form-card shadow p-4">
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Name</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="text-danger small" />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Price</label>
                    <Field name="price" type="number" className="form-control" />
                    <ErrorMessage name="price" component="div" className="text-danger small" />
                </div>
                </div>

                <div className="mb-3">
                <label>Description</label>
                <Field as="textarea" name="description" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger small" />
                </div>

                <div className="row">
                <div className="col-md-4 mb-3">
                    <label>Size</label>
                    <Field as="select" name="size" className="form-select">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    </Field>
                </div>

                <div className="col-md-4 mb-3">
                    <label>Status</label>
                    <Field as="select" name="status" className="form-select">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    </Field>
                </div>

                <div className="col-md-4 mb-3">
                    <label>Color</label>
                    <Field name="color" className="form-control" />
                </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Category</label>
                    <Field as="select" name="category" className="form-select">
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                        {cat.name}
                        </option>
                    ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-danger small" />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Image URL</label>
                    <Field name="imageUrl" className="form-control" />
                </div>
                </div>

                <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Adding..." : "Add Product"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    }
