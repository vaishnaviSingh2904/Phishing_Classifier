import React, { useState } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and Sign-Up

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
          <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'SIGN UP' : 'LOGIN'}</h2>

          {/* Conditional Rendering for Login or Sign-Up */}
          {isSignUp ? (
            // Sign-Up Form
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="w-full p-3 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500 transition duration-200 mb-4">
                Create Account →
              </button>
              <p className="text-sm mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-yellow-400 hover:underline"
                >
                  Login here!
                </button>
              </p>
            </>
          ) : (
            // Login Form
            <>
              <input
                type="text"
                placeholder="User ID or Email"
                className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 mb-4 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="w-full p-3 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500 transition duration-200 mb-4">
                Login to Your Account →
              </button>
              <a href="#forgot" className="text-yellow-400 hover:underline text-sm block mb-6">
                Forgot Password?
              </a>
              <div className="flex items-center justify-center mb-6">
                <hr className="w-1/3 border-gray-600" />
                <span className="mx-4 text-gray-400">OR</span>
                <hr className="w-1/3 border-gray-600" />
              </div>
              <button className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-200">
                <i className="fab fa-google mr-2"></i> Sign in with Google
              </button>
              <button className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-200">
                <i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook
              </button>
              <button className="w-full p-3 bg-gray-700 rounded hover:bg-gray-600 transition duration-200">
                <i className="fab fa-apple mr-2"></i> Sign in with Apple
              </button>
              <p className="text-sm mt-4">
                Don't have an account yet?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-yellow-400 hover:underline"
                >
                  Register now!
                </button>
              </p>
            </>
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
        <p>Copyright © {new Date().getFullYear()} PhishShield. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;