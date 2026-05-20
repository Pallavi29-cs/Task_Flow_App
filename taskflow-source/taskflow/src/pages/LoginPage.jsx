/* pages/LoginPage.jsx
   Login form with validation — on success saves user to context and redirects */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  // Form field state
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors]       = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear that field's error on change
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation
    const errs = validateLogin(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Store user in context and navigate to home
    login({ name: form.name.trim(), email: form.email.trim() });
    navigate('/home');
  };

  return (
    <div className="login-page">
      {/* Background blobs for visual depth */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="login-card fade-in">
        {/* Logo */}
        <div className="login-logo">
          <span className="login-icon">⬡</span>
          <h1 className="login-title">TaskFlow</h1>
          <p className="login-subtitle">Sign in to manage your tasks</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="field-group">
            <label className="field-label">FULL NAME</label>
            <input
              className={`field-input ${errors.name ? 'field-error' : ''}`}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Deepak Kumar"
              autoComplete="name"
            />
            {errors.name && <span className="err-msg">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="field-group">
            <label className="field-label">EMAIL ADDRESS</label>
            <input
              className={`field-input ${errors.email ? 'field-error' : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="err-msg">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="field-group">
            <label className="field-label">PASSWORD</label>
            <div className="password-wrap">
              <input
                className={`field-input ${errors.password ? 'field-error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span className="err-msg">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-signin">
            Sign In →
          </button>

          <p className="login-hint">
            Password must be 6+ characters with an uppercase letter and a number.
          </p>
        </form>
      </div>
    </div>
  );
}
