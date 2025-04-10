import React, { useState } from 'react';
import UrlScanner from './Analyzers/UrlScanner';
import EmailAnalyzer from './Analyzers/EmailAnalyzer';
import Classification from './Analyzers/Classification';

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState('URL SCANNER');

  return (
    <main className="container mx-auto text-center py-12 px-6">
      <h1 className="text-3xl font-bold mb-4">PhishSheild Detects and Monitors Phishing and Scam Sites</h1>
      <p className="text-gray-600 mb-8">With PhishSheild, you can scan suspicious URLs and Analyze Email Content.</p>
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 text-xl">
          <button
            onClick={() => setActiveTab('URL SCANNER')}
            className={`px-4 py-2 ${activeTab === 'URL SCANNER' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            URL Scanner
          </button>
          <span className="text-gray-400 text-4xl ">|</span>
          <button
            onClick={() => setActiveTab('Email Content Analyzer')}
            className={`px-4 py-2 ${activeTab === 'Email Content Analyzer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Email Content Analyzer
          </button>
          <span className="text-gray-400 text-4xl">|</span>
          <button
            onClick={() => setActiveTab('Classification')}
            className={`px-4 py-2 ${activeTab === 'Classification' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Classification
          </button>
        </div>
      </div>
      {activeTab === 'URL SCANNER' && <UrlScanner />}
      {activeTab === 'Email Content Analyzer' && <EmailAnalyzer />}
      {activeTab === 'Classification' && <Classification />}
    </main>
  );
};

export default MainContainer;