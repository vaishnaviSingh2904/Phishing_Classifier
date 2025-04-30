import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ""
  });
  const navigate = useNavigate();
  
  // Reset validation errors when switching between login and signup
  useEffect(() => {
    setValidationErrors({});
    setError("");
  }, [isSignUp]);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password strength calculation
    let score = 0;
    let message = "";

    if (password.length < 8) {
      message = "Password must be at least 8 characters";
    } else {
      score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
      
      if (score < 3) message = "Weak password";
      else if (score < 5) message = "Moderate password";
      else message = "Strong password";
    }

    return { score, message };
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    
    // Validate on change
    const newErrors = { ...validationErrors };
    
    if (name === "email" && value.trim() !== "" && !validateEmail(value)) {
      newErrors.email = "Please enter a valid email address";
    } else if (name === "email") {
      delete newErrors.email;
    }
    
    setValidationErrors(newErrors);
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    
    // Validate on change
    const newErrors = { ...validationErrors };
    
    if (name === "name" && value.trim() === "") {
      newErrors.name = "Name is required";
    } else if (name === "name") {
      delete newErrors.name;
    }
    
    if (name === "email" && value.trim() !== "" && !validateEmail(value)) {
      newErrors.email = "Please enter a valid email address";
    } else if (name === "email") {
      delete newErrors.email;
    }
    
    if (name === "password") {
      const strength = validatePassword(value);
      setPasswordStrength(strength);
      
      if (value.trim() === "") {
        newErrors.password = "Password is required";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }
    
    setValidationErrors(newErrors);
  };

  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    
    return errors;
  };

  const validateSignUpForm = () => {
    const errors = {};
    
    if (!signUpData.name || signUpData.name.trim() === "") {
      errors.name = "Name is required";
    }
    
    if (!signUpData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(signUpData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!signUpData.password) {
      errors.password = "Password is required";
    } else if (signUpData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      errors.password = "Please choose a stronger password";
    }
    
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    const formErrors = validateLoginForm();
    if (Object.keys(formErrors).length > 0) {
      setValidationErrors(formErrors);
      return;
    }
    
    try {
      const response = await axios.post("/api/login", loginData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    if (props.onLoginSuccess) {
      props.onLoginSuccess();
    }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    const formErrors = validateSignUpForm();
    if (Object.keys(formErrors).length > 0) {
      setValidationErrors(formErrors);
      return;
    }
    
    try {
      await axios.post("/api/register", signUpData);
      setIsSignUp(false); // Switch to login form after successful registration
      setLoginData({ email: signUpData.email, password: "" });
      // Show success message
      alert("Account created successfully! Please login.");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  // Helper function to render password strength indicator
  const renderPasswordStrength = () => {
    if (!signUpData.password) return null;
    
    let colorClass = "bg-red-500";
    if (passwordStrength.score >= 4) colorClass = "bg-green-500";
    else if (passwordStrength.score >= 3) colorClass = "bg-yellow-400";
    
    return (
      <div className="mb-4">
        <div className="w-full bg-gray-600 h-1 rounded-full">
          <div 
            className={`h-1 rounded-full ${colorClass}`} 
            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-1 text-left">{passwordStrength.message}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0047] to-[#6a0dad] flex flex-col justify-between items-center relative overflow-hidden text-white font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/path-to-geometric-pattern.png')] bg-cover bg-center opacity-20"></div>

      {/* Header */}
      <div className="text-center py-6 z-10">
        <img
          src="/headIcon.png" // Replace with actual logo path
          alt="PhishShield Logo"
          className="mx-auto h-35"
        />
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center w-full flex-grow z-10">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">
            {isSignUp ? "SIGN UP" : "LOGIN"}
          </h2>

          {/* Error message display */}
          {error && (
            <div className="bg-red-500 bg-opacity-60 text-white p-3 mb-4 rounded">
              {error}
            </div>
          )}

          {/* Conditional Rendering for Login or Sign-Up */}
          {isSignUp ? (
            // Sign-Up Form
            <form onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  placeholder="Full Name"
                  className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.name ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-yellow-400"
                  }`}
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-xs mt-1 text-left">{validationErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  placeholder="Email Address"
                  className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.email ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-yellow-400"
                  }`}
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-xs mt-1 text-left">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  placeholder="Create Password"
                  className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.password ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-yellow-400"
                  }`}
                />
                {validationErrors.password && (
                  <p className="text-red-400 text-xs mt-1 text-left">{validationErrors.password}</p>
                )}
                {renderPasswordStrength()}
              </div>
              
              <button 
                type="submit"
                className="w-full p-3 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500 transition duration-200 mb-4"
              >
                Create Account →
              </button>
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-yellow-400 hover:underline"
                >
                  Login here!
                </button>
              </p>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email Address"
                  className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.email ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-yellow-400"
                  }`}
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-xs mt-1 text-left">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter Password"
                  className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.password ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-yellow-400"
                  }`}
                />
                {validationErrors.password && (
                  <p className="text-red-400 text-xs mt-1 text-left">{validationErrors.password}</p>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full p-3 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500 transition duration-200 mb-4"
              >
                Login to Your Account →
              </button>
              <a
                href="#forgot"
                className="text-yellow-400 hover:underline text-sm block mb-6"
              >
                Forgot Password?
              </a>
              <div className="flex items-center justify-center mb-6">
                <hr className="w-1/3 border-gray-600" />
                <span className="mx-4 text-gray-400">OR</span>
                <hr className="w-1/3 border-gray-600" />
              </div>
              <button 
                type="button"
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-200"
              >
                <i className="fab fa-google mr-2"></i> Sign in with Google
              </button>
              <button 
                type="button"
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-200"
              >
                <i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook
              </button>
              <button 
                type="button"
                className="w-full p-3 bg-gray-700 rounded hover:bg-gray-600 transition duration-200"
              >
                <i className="fab fa-apple mr-2"></i> Sign in with Apple
              </button>
              <p className="text-sm mt-4">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-yellow-400 hover:underline"
                >
                  Register now!
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-gray-300 z-10">
        <a href="#privacy" className="text-yellow-400 hover:underline mr-2">
          Privacy Policy
        </a>
        <a href="#terms" className="text-yellow-400 hover:underline mr-2">
          Terms of Service
        </a>
        <p>
          Copyright © {new Date().getFullYear()} PhishShield. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;