import { useState } from "react";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.message
    ) {
      setMessage("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Please fill out all fields.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <section
      id="about"
      className="py-12 bg-gradient-to-b from-gray-100 to-gray-200"
    >
      <div className="container mx-auto px-4">
        {/* About Section */}
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          About PhishShield
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Welcome to PhishShield, your trusted AI-powered solution for detecting
          phishing threats. In an era where cyberattacks are on the rise,
          PhishShield is designed to safeguard users by identifying fraudulent
          websites and preventing phishing scams. Using advanced machine
          learning algorithms, our classifier analyzes website structures, URLs,
          and other key indicators to determine whether a site is legitimate or
          a potential threat. Our mission is to provide a fast, accurate, and
          user-friendly security tool to help individuals and businesses stay
          protected online. With PhishShield, browse with confidence and keep
          cyber threats at bay!
        </p>

        {/* Contact Us Section */}
        <h3 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Contact Us
        </h3>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
            value={formData.email}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Enter your question or message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <button
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message === "Message sent successfully!"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
