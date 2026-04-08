import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authAPI, persistSession } from "../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials((current) => ({ ...current, [e.target.name]: e.target.value }));
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await authAPI.login(credentials.email.trim().toLowerCase(), credentials.password);
      persistSession(response.data);
      setSuccessMessage("Login successful. Redirecting to your dashboard...");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.error ||
        "Unable to log in right now. Please check your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm-login-container">
      <main className="sm-login-main">
        <div className="sm-auth-page-topbar">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="sm-back-btn"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>

        <div className="sm-login-shell">
          <section className="sm-login-sidepanel">
            <span className="sm-auth-chip">SchemeMatch Access</span>
            <h1 className="sm-login-title">Welcome back to your benefits dashboard.</h1>
            <p className="sm-login-subtitle">
              Sign in to review your saved scheme matches, track impact scores, and continue from where you left off.
            </p>
            <div className="sm-auth-points">
              <div className="sm-auth-point">
                <span className="sm-auth-point-title">Secure login</span>
                <p>Your session is protected with JWT-based authentication tied to your backend account.</p>
              </div>
              <div className="sm-auth-point">
                <span className="sm-auth-point-title">Fast access</span>
                <p>Return directly to your dashboard after login instead of rebuilding your profile every time.</p>
              </div>
            </div>
          </section>

          <section className="sm-login-wrapper">
            <div className="sm-login-header">
              <h2 className="sm-login-form-title">Login</h2>
              <p className="sm-login-form-subtitle">Use the same email and password you used during registration.</p>
            </div>

            {error && <div className="sm-error-message">{error}</div>}
            {successMessage && <div className="sm-success-message">{successMessage}</div>}

            <form className="sm-form" onSubmit={handleSubmit}>
              <div className="sm-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  required
                  onChange={handleChange}
                  placeholder="name@example.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="sm-input-group">
                <div className="sm-label-row">
                  <label htmlFor="password">Password</label>
                  <span className="sm-forgot-password">Authenticated with backend</span>
                </div>

                <div className="sm-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    required
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="sm-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="sm-btn-submit" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </button>
            </form>

            <div className="sm-login-footer">
              <p>
                Don&apos;t have an account?
                <Link to="/register" className="sm-link-highlight"> Build your profile</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
