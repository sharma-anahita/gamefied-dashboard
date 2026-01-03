import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Validation helpers
  const validateEmail = (email) => {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const validateForm = (fields = form) => {
    const errors = {};
    if (!fields.name.trim()) errors.name = 'Name is required';
    if (!fields.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(fields.email)) errors.email = 'Enter a valid email address';
    if (!fields.password) errors.password = 'Password is required';
    else if (!validatePassword(fields.password)) errors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
    if (!fields.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (fields.password !== fields.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setError('');
    setFieldErrors(validateForm(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Registration succeeded but no token received');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2 className="register-title">Create Account</h2>
        <div className="register-field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            disabled={loading}
            aria-invalid={!!fieldErrors.name}
            aria-describedby="name-error"
          />
          {fieldErrors.name && <div className="register-error" id="name-error">{fieldErrors.name}</div>}
        </div>
        <div className="register-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            disabled={loading}
            aria-invalid={!!fieldErrors.email}
            aria-describedby="email-error"
          />
          {fieldErrors.email && <div className="register-error" id="email-error">{fieldErrors.email}</div>}
        </div>
        <div className="register-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            disabled={loading}
            aria-invalid={!!fieldErrors.password}
            aria-describedby="password-error"
          />
          {fieldErrors.password && <div className="register-error" id="password-error">{fieldErrors.password}</div>}
        </div>
        <div className="register-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            disabled={loading}
            aria-invalid={!!fieldErrors.confirmPassword}
            aria-describedby="confirmPassword-error"
          />
          {fieldErrors.confirmPassword && <div className="register-error" id="confirmPassword-error">{fieldErrors.confirmPassword}</div>}
        </div>
        {error && <div className="register-error">{error}</div>}
        <button className="register-btn" type="submit" disabled={loading || !isFormValid}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
