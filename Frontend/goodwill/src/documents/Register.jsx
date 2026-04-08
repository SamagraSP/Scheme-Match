import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, persistSession } from '../services/api';
import './Register.css';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  gender: '',
  location: '',
  category: '',
  occupation: '',
  income: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const passwordMismatch = useMemo(() => {
    return formData.confirmPassword && formData.password !== formData.confirmPassword;
  }, [formData.confirmPassword, formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    if (passwordMismatch) {
      setError('Passwords do not match. Please re-enter them.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        age: Number(formData.age),
        gender: formData.gender,
        location: formData.location.trim(),
        category: formData.category,
        occupation: formData.occupation.trim(),
        income: Number(formData.income),
      };

      const response = await authAPI.register(payload);
      persistSession(response.data);
      setSuccessMessage('Profile created successfully. Redirecting to your dashboard...');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm-reg-container">
      <main className="sm-reg-main">
        <div className="sm-auth-page-topbar">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="sm-back-btn-reg"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>

        <div className="sm-reg-wrapper">
          <div className="sm-reg-header">
            <span className="sm-auth-chip">Create your SchemeMatch profile</span>
            <h1 className="sm-reg-title">Build Your Profile</h1>
            <p className="sm-reg-subtitle">
              This information stays private and is used to match you with the most relevant schemes and benefits.
            </p>
          </div>

          <form className="sm-form" onSubmit={handleSubmit}>
            <div className="sm-form-section">
              <h2 className="sm-section-title">1. Account Details</h2>
              <div className="sm-input-grid">
                <div className="sm-input-group full-width">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange} placeholder="e.g. Ramesh Kumar" autoComplete="name" />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange} placeholder="name@example.com" autoComplete="email" />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="password">Password</label>
                  <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} required onChange={handleChange} placeholder="Create a secure password" autoComplete="new-password" minLength="8" />
                </div>
                <div className="sm-input-group full-width">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="sm-password-inline">
                    <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} required onChange={handleChange} placeholder="Re-enter your password" autoComplete="new-password" minLength="8" />
                    <button type="button" className="sm-password-toggle-inline" onClick={() => setShowPassword((current) => !current)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm-divider"></div>

            <div className="sm-form-section">
              <h2 className="sm-section-title">2. Profile Information</h2>
              <div className="sm-input-grid">
                <div className="sm-input-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" name="age" min="18" max="100" value={formData.age} required onChange={handleChange} placeholder="e.g. 28" />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={formData.gender} required onChange={handleChange}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} required onChange={handleChange} placeholder="e.g. Delhi, Maharashtra" />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} required onChange={handleChange}>
                    <option value="" disabled>Select Category</option>
                    <option value="gen">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input type="text" id="occupation" name="occupation" value={formData.occupation} required onChange={handleChange} placeholder="e.g. Farmer, Artisan, Student" />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="income">Annual Income (INR)</label>
                  <input type="number" id="income" name="income" value={formData.income} required onChange={handleChange} placeholder="e.g. 150000" min="0" />
                </div>
              </div>
            </div>

            {passwordMismatch && <div className="sm-error-message">Passwords do not match yet.</div>}
            {error && <div className="sm-error-message">{error}</div>}
            {successMessage && <div className="sm-success-message">{successMessage}</div>}

            <button type="submit" className="sm-btn-submit" disabled={isLoading || passwordMismatch}>
              {isLoading ? 'Creating Account...' : 'Analyze Matches'} <span className="sm-arrow">{'->'}</span>
            </button>
          </form>

          <div className="sm-reg-footer">
            <p>
              Already have an account?
              <Link to="/login" className="sm-link-highlight"> Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
