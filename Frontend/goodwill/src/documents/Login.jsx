import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, persistSession } from "../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(credentials.email.trim(), credentials.password);
      persistSession(response.data);
      setSuccessMessage("Login successful. Taking you to your dashboard...");
      navigate("/dashboard");
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
      <button
        type="button"
        onClick={() => navigate("/")}
        className="sm-back-btn"
        aria-label="Back to home"
      >
        Back to Home
      </button>

      <main className="sm-login-main">
        <div className="sm-login-wrapper">
          <div className="sm-login-header">
            <span className="sm-auth-chip">SchemeMatch Access</span>
            <h1 className="sm-login-title">Welcome Back</h1>
            <p className="sm-login-subtitle">
              Log in to see your updated Personal Impact Scores, saved scheme matches,
              and new alerts tailored to your profile.
            </p>
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
                <span className="sm-forgot-password">Secure sign-in</span>
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
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="sm-btn-submit" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <div className="sm-login-footer">
            <p>
              Don't have an account?
              <Link to="/register" className="sm-link-highlight"> Build your profile</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
