import React from 'react';
import { Link } from 'react-router-dom'; // Fixed import for react-router-dom

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/headIcon.png"
            alt="PhishShield logo"
            className="h-20"
          />
          {/* <span className="ml-3 text-2xl font-bold text-blue-600">PhishShield</span> */}
        </div>

        {/* Navigation Section */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Solutions
          </Link>
          <Link
            to="/blog"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;