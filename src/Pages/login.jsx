import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import Logo from '../components/Logo';
import './login.css';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();

  
  const [fields, setFields] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateLogin(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    login({ name: fields.name.trim(), email: fields.email.trim() });
    navigate('/home');
  }

  
  return (
    <div className="login-page">
      <div className="login-card">

        {}
        <div className="login-logo">
          <Logo className="login-logo-img" size={28} />
          <h1 className="login-title">TaskFlow</h1>
          <p className="login-subtitle">Sign in to manage your tasks</p>
        </div>

        {}
        <form onSubmit={handleSubmit} className="login-form" noValidate>

          {}
          <div className="field-group">
            <label htmlFor="name" className="field-label">FULL NAME</label>
            <input
              id="name"
              name="name"
              type="text"
              className={errors.name ? 'input input-error' : 'input'}
              value={fields.name}
              onChange={handleChange}
              placeholder="e.g. Pallavi"
              pattern="^[A-Za-zÀ-ÖØ-öø-ÿ ]+$"
              title="Name may only contain letters and spaces."
              autoComplete="name"
              inputMode="text"
            />
            {errors.name && <span className="input-error-text">{errors.name}</span>}
          </div>

          {}
          <div className="field-group">
            <label htmlFor="email" className="field-label">EMAIL ADDRESS</label>
            <input
              id="email"
              name="email"
              type="email"
              className={errors.email ? 'input input-error' : 'input'}
              value={fields.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="input-error-text">{errors.email}</span>}
          </div>

          {}
          <div className="field-group">
            <label htmlFor="password" className="field-label">PASSWORD</label>
            <div className="pw-wrap">
              <input
                id="password"
                name="password"
                type={showPw ? 'text' : 'password'}
                className={errors.password ? 'input password-input input-error' : 'input password-input'}
                value={fields.password}
                onChange={handleChange}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
                autoComplete="current-password"
              />
              {}
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="eye-btn"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span className="input-error-text">{errors.password}</span>}
          </div>

          {}
          <button type="submit" className="submit-btn">
            Sign In →
          </button>

          <p className="hint">
            Password must be 6+ characters with an uppercase letter and a number.
          </p>
        </form>
      </div>

      <div className="blob blob-left" aria-hidden="true" />
      <div className="blob blob-right" aria-hidden="true" />
    </div>
  );
}
