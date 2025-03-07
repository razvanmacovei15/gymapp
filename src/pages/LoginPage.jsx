import React, { useState } from 'react';
import './LoginPage.css'; // Ensure this file exists for styling
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Submit login
  const submitLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.email || !formData.password) {
      alert('Please enter email and password');
      return;
    }

    setIsSubmitting(true);

    try {
      if (handleLogin) {
        await handleLogin(formData.email, formData.password);
        console.log('Login successful');
        navigate('/gymapp'); // Navigate to the home page after successful login
      } else {
        alert('Login function not found');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 style={{ color: 'white' }}>Welcome Back!</h1>
        <form onSubmit={submitLogin}>
          <div className="form-group">
            <label htmlFor="email" style={{ color: 'white' }}>Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ color: 'white' }}>Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <button onClick={() => navigate("/gymapp/signup")} type="button" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
