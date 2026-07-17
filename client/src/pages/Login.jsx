import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authServices";
import "../styles/admin.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {

            const data = await loginUser(form);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");

        } catch (err) {

            setError(err.response?.data?.message || "Login failed. Check your credentials.");

        }
    };

    return (
        <div className="login-page">

            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle">Sign in to manage content.</p>

            {error && <div className="login-error">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn">Login</button>

            </form>

            <br />

            <Link className="link-btn" to="/blog">
                ← Back to blog
            </Link>

        </div>
    );
}

export default Login;
