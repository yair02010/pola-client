    import { useNavigate } from "react-router-dom";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { registerUser } from "../services/authService";
    import { toast } from "react-toastify";
    import "../styles/Register.css";

    const RegisterSchema = Yup.object({
    name: Yup.string().min(2, "Too short").max(50, "Too long").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    phone: Yup.string().min(7, "Too short").max(15, "Too long").required("Phone is required"),
    address: Yup.object({
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        houseNumber: Yup.string().required("House number is required"),
        floor: Yup.string().nullable(),
        apartment: Yup.string().nullable(),
        entrance: Yup.string().nullable(),
        zipCode: Yup.string().required("Zip code is required"),
    }),
    });

    export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
        await registerUser(values);
        toast.success("Registration successful! ✅");
        navigate("/login");
        } catch (err) {
        const message = err.response?.data?.message || "Registration failed";
        setErrors({ submit: message });
        setSubmitting(false);
        toast.error("Registration failed ❌");
        }
    };

    return (
        <div className="register-page container">
        <h2 className="register-title">📝 Register</h2>

        <Formik
            initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
            address: {
                city: "",
                street: "",
                houseNumber: "",
                floor: "",
                apartment: "",
                entrance: "",
                zipCode: "",
            },
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
        >
            {({ isSubmitting, errors }) => (
            <Form className="register-card shadow p-4">
                {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

                <div className="mb-3">
                <label>Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>

                <div className="mb-3">
                <label>Phone</label>
                <Field name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger small" />
                </div>

                <h5 className="mt-4 mb-2">Address Details</h5>

                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>City</label>
                    <Field name="address.city" className="form-control" />
                    <ErrorMessage name="address.city" component="div" className="text-danger small" />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Street</label>
                    <Field name="address.street" className="form-control" />
                    <ErrorMessage name="address.street" component="div" className="text-danger small" />
                </div>
                </div>

                <div className="row">
                <div className="col-md-4 mb-3">
                    <label>House Number</label>
                    <Field name="address.houseNumber" className="form-control" />
                    <ErrorMessage name="address.houseNumber" component="div" className="text-danger small" />
                </div>
                <div className="col-md-4 mb-3">
                    <label>Floor</label>
                    <Field name="address.floor" className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                    <label>Apartment</label>
                    <Field name="address.apartment" className="form-control" />
                </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Entrance</label>
                    <Field name="address.entrance" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Zip Code</label>
                    <Field name="address.zipCode" className="form-control" />
                    <ErrorMessage name="address.zipCode" component="div" className="text-danger small" />
                </div>
                </div>

                <button
                type="submit"
                className="btn btn-dark w-100 mt-4"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Registering..." : "Register"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    }
