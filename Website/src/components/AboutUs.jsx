import { useState } from "react";

const AboutUs = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (formData.firstName && formData.lastName && formData.email && formData.message) {
        setMessage('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Please fill out all fields.');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    return (
      <section id="about" className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">About PhishShield</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            Welcome to PhishShield, your trusted AI-powered solution for detecting phishing threats. 
            In an era where cyberattacks are on the rise, PhishShield is designed to safeguard users 
            by identifying fraudulent websites and preventing phishing scams. Using advanced machine 
            learning algorithms, our classifier analyzes website structures, URLs, and other key 
            indicators to determine whether a site is legitimate or a potential threat. Our mission 
            is to provide a fast, accurate, and user-friendly security tool to help individuals and 
            businesses stay protected online. With PhishShield, browse with confidence and keep cyber 
            threats at bay!
          </p>
          <h3 className="text-2xl font-semibold text-center mb-6">Contact Us</h3>
          <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="p-2 border rounded"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="p-2 border rounded"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-2 border rounded mb-4"
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Enter your question or message"
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {message && <p className="mt-2 text-green-600">{message}</p>}
          </div>
        </div>
      </section>
    );
  };

export default AboutUs;