import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-wrap justify-between px-6">
        {/* PhishShield Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 text-blue-700">PhishShield</h3>
          <p className="text-gray-600 mb-4">
            PhishShield provides free online security tools for mitigating typosquatting, domain monitoring, phishing detection, and a suite of active security protections.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Security Tools Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Security Tools</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">URL Scanner</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Email Content Analyzer</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">ML Classification</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Resources</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">Resource</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">API</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Glossary</a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Company</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">Bolster</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} PhishShield. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;