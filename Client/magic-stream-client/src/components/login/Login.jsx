import { useState } from "react";
import Form from "react-bootstrap/Form";
import axiosClient from "../../api/axiosConfig";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/MagicStreamLogo.png";

const Login = () => {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosClient.post("/login", { email, password });
            if (response.data?.error) {
                setError(response.data.error);
                return;
            }
            setAuth(response.data);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ms-auth-page">
            <div className="ms-auth">
                {/* Left hero panel */}
                <div className="ms-hero">
                    <h1>
                        Rwanda’s <span>Netflix</span> for Movies
                    </h1>
                    <p>
                        Welcome back to Magic Stream. Discover Rwanda’s stories with a premium
                        dark experience — fast posters via CDN, cloud storage, and a modern
                        streaming UI.
                    </p>

                    <div className="ms-badges">
                        <span className="ms-badge">🎬 Rwandan Cinema</span>
                        <span className="ms-badge">⚡ CloudFront CDN</span>
                        <span className="ms-badge">🪣 S3 Posters</span>
                        <span className="ms-badge">🔐 Secure Auth</span>
                    </div>
                </div>

                {/* Right form card */}
                <div className="ms-auth-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <img
                            src={logo}
                            alt="Magic Stream"
                            width={44}
                            height={44}
                            style={{ borderRadius: 10 }}
                        />
                        <div>
                            <h1 className="ms-auth-title" style={{ marginBottom: 2 }}>
                                Sign In
                            </h1>
                            <div className="ms-auth-subtitle" style={{ margin: 0 }}>
                                Login to <strong>Magic Stream</strong> and start watching.
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div
                            style={{
                                background: "rgba(229, 9, 20, 0.14)",
                                border: "1px solid rgba(229, 9, 20, 0.35)",
                                color: "rgba(255,255,255,0.92)",
                                borderRadius: 12,
                                padding: "10px 12px",
                                marginBottom: 12,
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <div className="ms-field">
                            <Form.Label className="ms-label">Email address</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Password</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="ms-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                  <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: 10 }}
                  />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </Form>

                    <div className="ms-hint">
                        Don&apos;t have an account? <Link to="/register">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
