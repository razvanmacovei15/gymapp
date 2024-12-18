import React, { useState } from "react";
import "./SignUp.css"; // Ensure this file exists for styling
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { authState, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    formData.role = "ADMIN"; // Set the role to ADMIN by default

    try {
      if (handleRegister) {
        await handleRegister(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );
        navigate("/login"); // Navigate to the login page after successful registration
      } else {
        alert("Register function not found");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setIsSubmitting(false); // Properly reset the submitting state
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 style={{ color: 'white' }}>WELCOME!</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email" style={{ color: 'white' }}>Username</label>

            <input
              type="text"
              id="name"
              placeholder="Enter your username"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
                aria-label="Toggle password visibility"
              >
                👁️
              </button>
            </div>
          </div>
          {/* <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword" // Match the key in formData
                placeholder="Confirm your password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                aria-label="Toggle confirm password visibility"
              >
                👁️
              </button>
            </div>
          </div> */}
          <div className="button-group">
            <button
              type="submit"
              className="signup-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="signup-button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
