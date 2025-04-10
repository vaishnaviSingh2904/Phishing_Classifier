import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex flex-col justify-between items-center relative overflow-hidden text-white font-sans">
      {/* Background Pattern (simulated with Tailwind classes) */}
      <div className="absolute inset-0 bg-[url('path-to-geometric-pattern.png')] opacity-30"></div>

      {/* Header */}
      <div className="text-center py-6">
        <img
          src="path-to-phishshield-logo.png" // Replace with actual logo path or URL
          alt="PhishShield Logo"
          className="mx-auto w-12 h-auto"
        />
        <h1 className="text-4xl font-bold">PHISHSHIELD</h1>
        <p className="text-gray-300">Secure Every Click</p>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center w-full flex-grow">
        <div className="flex justify-center gap-12 p-6">
          {/* User Login */}
          <div className="bg-black bg-opacity-70 p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">USER</h2>
            <input
              type="text"
              placeholder="User Id"
              className="w-full p-2 mb-2 bg-gray-800 rounded text-white placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Enter Pin"
              className="w-full p-2 mb-2 bg-gray-800 rounded text-white placeholder-gray-400"
            />
            <button className="w-full p-2 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-500">
              Login to Your Account →
            </button>
            <p className="text-sm mt-2">
              Don't have an account yet?{' '}
              <a href="#register" className="text-yellow-400 hover:underline">
                Register now!
              </a>
            </p>
          </div>

          {/* Admin Login */}
          <div className="bg-black bg-opacity-70 p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">ADMIN</h2>
            <button className="w-full p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">
              G Sign in with Google
            </button>
            <button className="w-full p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">
              f Sign in with Facebook
            </button>
            <button className="w-full p-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">
               Sign in with Apple Account
            </button>
            <a href="#forgot" className="text-yellow-400 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-gray-300">
        <a href="#privacy" className="text-yellow-400 hover:underline mr-2">
          Privacy Policy
        </a>
        <p>Copyright © phishshield2025</p>
      </div>
    </div>
  );
};

export default Login;