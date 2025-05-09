import React, { useState } from 'react';
import axios from 'axios';

const EmailHeaderAnalyzer = () => {
  const [emailHeaders, setEmailHeaders] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.post('http://localhost:5000/api/analyze-email', 
        { emailHeaders },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to analyze email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-6 bg-white shadow-md rounded-lg gap-8">
      {/* Left Section - Description */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Email Header Analyzer
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your Solution to Understand & Diagnose Email Issues
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Discover hidden details, diagnose problems, and gain a deeper understanding
          of your mail flow with our Email Analyzer Tool. Don't let an intricate email
          header puzzle you – leverage our tool's capabilities for precise email header
          analysis.
        </p>
        
        {result && (
          <div className={`p-6 rounded-lg shadow-md mt-6 ${result.isPhishing ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full ${result.isPhishing ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} mr-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {result.isPhishing ? 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> :
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  }
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${result.isPhishing ? 'text-red-700' : 'text-green-700'}`}>
                {result.isPhishing ? 'Potential Phishing Email' : 'Email Appears Safe'}
              </h3>
            </div>
            <div className="ml-13">
              <p className="mb-2"><strong>Confidence Score:</strong> {(parseFloat(result.confidence) * 100).toFixed(2)}%</p>
              <p className="mb-2"><strong>Analysis Date:</strong> {new Date(result.predictionTime).toLocaleString()}</p>
              {result.message && <p className="mb-4"><strong>Summary:</strong> {result.message}</p>}
              
              {/* Security Features Section */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-700 mb-2">Security Features:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li className={`flex items-center ${result.features?.spfResult === 'pass' ? 'text-green-600' : result.features?.spfResult === 'fail' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <span className="mr-2">{result.features?.spfResult === 'pass' ? '✓' : result.features?.spfResult === 'fail' ? '✗' : '!'}</span>
                    <span>SPF: {result.features?.spfResult}</span>
                  </li>
                  <li className={`flex items-center ${result.features?.dkimResult === 'pass' ? 'text-green-600' : result.features?.dkimResult === 'fail' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <span className="mr-2">{result.features?.dkimResult === 'pass' ? '✓' : result.features?.dkimResult === 'fail' ? '✗' : '!'}</span>
                    <span>DKIM: {result.features?.dkimResult}</span>
                  </li>
                  {result.features?.suspiciousSender !== undefined && (
                    <li className={`flex items-center ${!result.features.suspiciousSender ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="mr-2">{!result.features.suspiciousSender ? '✓' : '✗'}</span>
                      <span>Sender Analysis: {!result.features.suspiciousSender ? 'Normal' : 'Suspicious'}</span>
                    </li>
                  )}
                  {result.features?.replyToMismatch !== undefined && (
                    <li className={`flex items-center ${!result.features.replyToMismatch ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="mr-2">{!result.features.replyToMismatch ? '✓' : '✗'}</span>
                      <span>Reply-To: {!result.features.replyToMismatch ? 'Valid' : 'Mismatched'}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Risk Factors Section */}
              {result.riskFactors && result.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Risk Factors Identified:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {result.riskFactors.map((factor, index) => (
                      <li key={index} className="mb-1">{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Analyzer UI */}
      <div className="md:w-1/2 flex flex-col w-full">
        <form onSubmit={handleSubmit}>
          <textarea
            value={emailHeaders}
            onChange={(e) => setEmailHeaders(e.target.value)}
            placeholder="Paste your Email Headers here..."
            className="w-full h-64 bg-gray-50 text-gray-800 p-4 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          {error && (
            <div className="p-4 my-4 bg-red-100 text-red-700 border-l-4 border-red-500 rounded">
              <p>{error}</p>
            </div>
          )}
          
          <div className="mt-4 flex space-x-4">
            <button 
              type="submit"
              className={`px-6 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} text-white transition`}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
            <button 
              type="button"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => document.getElementById('email-upload').click()}
            >
              Upload Email
            </button>
            <input 
              id="email-upload"
              type="file"
              accept=".eml,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setEmailHeaders(e.target.result);
                  reader.readAsText(file);
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailHeaderAnalyzer;