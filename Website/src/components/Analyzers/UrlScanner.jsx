import React, { useState } from 'react';
import axios from 'axios';

const UrlScanner = () => {
  const [url, setUrl] = useState('');
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

      const response = await axios.post('http://localhost:5000/api/scan-url', 
        { url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to scan URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">URL Phishing Scanner</h1>
      <p className="mb-6 text-gray-700">Enter a URL to check if it's a potential phishing site:</p>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 ${loading ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} text-white font-medium rounded transition`}
            disabled={loading}
          >
            {loading ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 border-l-4 border-red-500 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className={`p-6 rounded-lg shadow-md ${result.isPhishing ? 'bg-red-50' : 'bg-green-50'}`}>
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
              {result.isPhishing ? 'Potential Phishing Detected' : 'URL Appears Safe'}
            </h3>
          </div>
          
          <div className="ml-13 mb-6">
            <p className="mb-2"><strong>URL:</strong> {result.url}</p>
            <p className="mb-2"><strong>Confidence Score:</strong> {(parseFloat(result.confidence) * 100).toFixed(2)}%</p>
            <p className="mb-2"><strong>Scan Date:</strong> {new Date(result.predictionTime).toLocaleString()}</p>
            {result.message && <p className="mb-2"><strong>Details:</strong> {result.message}</p>}
          </div>
          
          {/* URL Feature Analysis */}
          <div className="bg-white bg-opacity-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">URL Feature Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.features?.domainAge !== undefined && (
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.features.domainAge > 365 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span>Domain Age: {result.features.domainAge} days</span>
                </div>
              )}
              
              {result.features?.hasHttps !== undefined && (
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.features.hasHttps ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>HTTPS: {result.features.hasHttps ? 'Yes' : 'No'}</span>
                </div>
              )}
              
              {result.features?.urlLength !== undefined && (
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.features.urlLength < 75 ? 'bg-green-500' : result.features.urlLength < 100 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <span>URL Length: {result.features.urlLength} characters</span>
                </div>
              )}
              
              {result.features?.numberOfSubdomains !== undefined && (
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.features.numberOfSubdomains <= 1 ? 'bg-green-500' : result.features.numberOfSubdomains == 2 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <span>Subdomains: {result.features.numberOfSubdomains}</span>
                </div>
              )}
              
              {result.features?.hasSpecialChars !== undefined && (
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${!result.features.hasSpecialChars ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span>Special Characters: {result.features.hasSpecialChars ? 'Present' : 'None'}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Recommendations */}
          <div className={`p-4 rounded-lg ${result.isPhishing ? 'bg-red-100' : 'bg-green-100'}`}>
            <h4 className="font-semibold mb-2">Recommendation</h4>
            {result.isPhishing ? (
              <div>
                <p className="mb-2">This URL shows signs of being a phishing attempt. We recommend:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Do not enter any personal information on this site</li>
                  <li>Do not download any files from this URL</li>
                  <li>Report this URL to your organization's security team</li>
                </ul>
              </div>
            ) : (
              <p>This URL appears to be legitimate based on our analysis. However, always remain cautious when sharing sensitive information online.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlScanner;