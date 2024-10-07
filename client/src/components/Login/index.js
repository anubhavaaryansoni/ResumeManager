import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import AuthContext from "../store/auth-context";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        formData,
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        authCtx.onLogin();
        alert("Logged in successfully!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;