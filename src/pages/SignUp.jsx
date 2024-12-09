import React, { useState } from "react";
import "./SignUp.css"; // Add CSS file for styling

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>WELCOME!</h1>
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
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="input-field"
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                👁️
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm your password"
                className="input-field"
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                👁️
              </button>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="signup-button">
              Login
            </button>
            <button type="button" className="signup-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
