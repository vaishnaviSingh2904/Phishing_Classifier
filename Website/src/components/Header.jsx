import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

function Header() {
  const location = useLocation(); // Get the current route

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
            className={`${
              location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
            } hover:text-blue-600 transition duration-200`}
          >
            Solutions
          </Link>
          <Link
            to="/blog"
            className={`${
              location.pathname === '/blog' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
            } hover:text-blue-600 transition duration-200`}
          >
            Blog
          </Link>
          <Link
            to="/AboutUs"
            className={`${
              location.pathname === '/AboutUs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
            } hover:text-blue-600 transition duration-200`}
          >
            About Us
          </Link>
          <Link
            to="/login"
            className={`${
              location.pathname === '/login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
            } hover:text-blue-600 transition duration-200`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;