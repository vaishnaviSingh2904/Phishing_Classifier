import React from 'react'

function Footer() {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto flex justify-between px-6">
          <div>
            <h3 className="text-xl font-bold mb-4">PhishSheild</h3>
            <p className="text-gray-600 mb-4">PhishSheild provides free online security tools for mitigating typosquatting, domain monitoring, phishing detection, and a suite of active security protections.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-600"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Security Tools</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="hover:text-blue-600">URL Scanner</a></li>
              <li><a href="#" className="hover:text-blue-600">Email Content Analyzer</a></li>
              <li><a href="#" className="hover:text-blue-600">ML Classification</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Resource</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Resource</a></li>
              <li><a href="#" className="hover:text-blue-600">API</a></li>
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Glossary</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Bolster</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }

export default Footer