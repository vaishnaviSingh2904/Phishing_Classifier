import React from 'react';

const EmailHeaderAnalyzer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-white">
      {/* Left Section - Description */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Email Header Analyzer:
        </h1>
        <h2 className="text-xl font-semibold mb-4">
          Your Solution to Understand & Diagnose Email Issues
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          Discover hidden details, diagnose problems, and gain a deeper understanding
          of your mail flow with our Email Analyzer Tool. Don't let an intricate email
          header puzzle you – leverage our tool's capabilities for precise email header
          analysis.
        </p>
      </div>

      {/* Right Section - Analyzer UI */}
      <div className="md:w-1/2 flex flex-col items-center">
        <textarea
          placeholder="Paste your Email Headers here..."
          className="w-full h-90 bg-gray-200 text-gray-800 p-4 rounded-md resize-none"
        />
        <div className="mt-4 flex space-x-4">
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
            Analyze
          </button>
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
            Upload Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailHeaderAnalyzer;
