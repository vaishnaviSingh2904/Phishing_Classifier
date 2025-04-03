import React from 'react'

function Header() {
    return (
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src="https://storage.googleapis.com/a1aa/image/2QmAx0aVH4kFczMTon_MgLoMrNrlYei1n7eSlar3zdk.jpg" alt="PhishShield logo" className="h-10 w-10" />
            <span className="ml-3 text-xl font-bold text-blue-600">PHISHSHIELD</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">Solutions</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Blog</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">AboutUs</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">LOGIN</a>
          </nav>
        </div>
      </header>
    );
  }

export default Header