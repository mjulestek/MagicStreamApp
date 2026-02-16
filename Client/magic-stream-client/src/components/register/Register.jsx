import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axiosClient from "../../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/MagicStreamLogo.png";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [favouriteGenres, setFavouriteGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenreChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        setFavouriteGenres(
            options.map((opt) => ({
                genre_id: Number(opt.value),
                genre_name: opt.label,
            }))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const defaultRole = "USER";

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                role: defaultRole,
                favourite_genres: favouriteGenres,
            };

            const response = await axiosClient.post("/register", payload);
            if (response.data?.error) {
                setError(response.data.error);
                return;
            }

            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axiosClient.get("/genres");
                setGenres(response.data);
            } catch (error) {
                console.error("Error fetching movie genres:", error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="ms-auth-page">
            <div className="ms-auth">
                {/* Left hero panel */}
                <div className="ms-hero">
                    <h1>
                        Join Rwanda’s <span>Magic Stream</span>
                    </h1>
                    <p>
                        Create your account and explore Rwanda’s cinema. Your posters load fast
                        via CloudFront CDN, stored in S3 — built like a real streaming platform.
                    </p>

                    <div className="ms-badges">
                        <span className="ms-badge">🎞️ Originals</span>
                        <span className="ms-badge">⚡ Ultra Fast Posters</span>
                        <span className="ms-badge">🪣 Cloud Storage</span>
                        <span className="ms-badge">🤖 AI Ready</span>
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
                                Create Account
                            </h1>
                            <div className="ms-auth-subtitle" style={{ margin: 0 }}>
                                Join <strong>Magic Stream</strong> — Rwanda’s Netflix for local cinema.
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
                            <Form.Label className="ms-label">First Name</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Last Name</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Email</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Password</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Confirm Password</Form.Label>
                            <Form.Control
                                className="ms-input"
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                isInvalid={!!confirmPassword && password !== confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                Passwords do not match.
                            </Form.Control.Feedback>
                        </div>

                        <div className="ms-field">
                            <Form.Label className="ms-label">Favourite genres</Form.Label>
                            <Form.Select
                                className="ms-input"
                                multiple
                                value={favouriteGenres.map((g) => String(g.genre_id))}
                                onChange={handleGenreChange}
                                style={{ minHeight: 120 }}
                            >
                                {genres.map((genre) => (
                                    <option key={genre.genre_id} value={genre.genre_id} label={genre.genre_name}>
                                        {genre.genre_name}
                                    </option>
                                ))}
                            </Form.Select>

                            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.65)", fontSize: "0.92rem" }}>
                                Hold Ctrl (Windows) or Cmd (Mac) to select multiple genres.
                            </div>
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
                                    Creating account...
                                </>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </Form>

                    <div className="ms-hint">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
