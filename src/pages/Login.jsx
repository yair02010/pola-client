    import { useNavigate } from "react-router-dom";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { loginUser } from "../services/authService";
    import { useUser } from "../contexts/UserContext";
    import "../styles/Login.css";

    const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    });

    export default function Login() {
    const navigate = useNavigate();
    const { reloadUser } = useUser();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
        const data = await loginUser(values);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        await reloadUser();
        if (data.user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
        } catch (err) {
        const message = err.response?.data?.message || "Login failed";
        setErrors({ submit: message });
        setSubmitting(false);
        }
    };

    return (
        <div className="login-page container">
        <h2 className="login-title">🔐 Login</h2>

        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
        >
            {({ isSubmitting, errors }) => (
            <Form className="login-card shadow p-4">
                {errors.submit && (
                <div className="alert alert-danger">{errors.submit}</div>
                )}

                <div className="mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                />
                </div>

                <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                />
                </div>

                <button
                type="submit"
                className="btn btn-dark w-100 mt-3"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    }
