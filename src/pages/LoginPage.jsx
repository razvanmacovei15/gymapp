import React, { useState } from 'react';
import './LoginPage.css'; // Make sure this file exists for styling

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="input-field"
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
            <button type="submit" className="login-button">
              Login
            </button>
            <button type="button" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
