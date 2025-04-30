    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { toast } from "react-toastify";
    import "../../styles/AdminForms.css";

    import { getProductById, updateProduct } from "../../services/productService";
    import { fetchCategories } from "../../services/categoryService";

    const ProductSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    size: Yup.string().oneOf(["XS", "S", "M", "L", "XL"], "Invalid size").required("Size is required"),
    color: Yup.string().nullable(),
    status: Yup.string().oneOf(["new", "used"], "Invalid status").required("Status is required"),
    category: Yup.string().required("Category is required"),
    imageUrl: Yup.string().url("Must be a valid URL").nullable(),
    inStock: Yup.boolean(),
    });

    export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProduct();
        getCategories();
    }, []);

    const getProduct = async () => {
        try {
        const data = await getProductById(id);
        setProduct(data);
        } catch (err) {
        console.error("Failed to load product", err);
        toast.error("Failed to load product");
        }
    };

    const getCategories = async () => {
        try {
        const data = await fetchCategories();
        setCategories(data);
        } catch (err) {
        console.error("Failed to fetch categories", err);
        toast.error("Failed to fetch categories");
        }
    };

    if (!product) return <div className="loading-admin">Loading product...</div>;

    return (
        <div className="admin-form-page container py-5">
        <h2 className="admin-form-title">✏️ Edit Product</h2>
        <Formik
            initialValues={{
            name: product.name || "",
            description: product.description || "",
            price: product.price || 0,
            size: product.size || "M",
            color: product.color || "",
            status: product.status || "used",
            category: product.category?._id || "",
            imageUrl: product.imageUrl || "",
            inStock: product.inStock ?? true,
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values) => {
            try {
                const token = localStorage.getItem("token");
                await updateProduct(id, values, token);
                toast.success("Product updated successfully ✅");
                navigate("/admin/products");
            } catch (err) {
                console.error("Update failed", err);
                toast.error("Failed to update product ❌");
            }
            }}
        >
            {({ isSubmitting }) => (
            <Form className="admin-form-card">
                <div className="mb-3">
                <label>Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Description</label>
                <Field name="description" as="textarea" rows="3" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Price</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage name="price" component="div" className="text-danger small" />
                </div>

                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Size</label>
                    <Field as="select" name="size" className="form-control">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    </Field>
                    <ErrorMessage name="size" component="div" className="text-danger small" />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Status</label>
                    <Field as="select" name="status" className="form-control">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-danger small" />
                </div>
                </div>

                <div className="mb-3">
                <label>Color</label>
                <Field name="color" className="form-control" />
                </div>

                <div className="mb-3">
                <label>Category</label>
                <Field as="select" name="category" className="form-control">
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Image URL</label>
                <Field name="imageUrl" className="form-control" />
                <ErrorMessage name="imageUrl" component="div" className="text-danger small" />
                </div>

                <div className="form-check mb-3">
                <Field type="checkbox" name="inStock" className="form-check-input" id="inStock" />
                <label className="form-check-label" htmlFor="inStock">In Stock</label>
                </div>

                <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Product"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    }
