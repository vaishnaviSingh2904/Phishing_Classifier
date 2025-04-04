import React from 'react'
import { useState } from 'react';

function MainContainer() {
    const [activeTab, setActiveTab] = useState('URL SCANNER');

    return (
      <main className="container mx-auto text-center py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">PhishSheild Detects and Monitors Phishing and Scam Sites</h1>
        <p className="text-gray-600 mb-8">With PhishSheild, you can scan suspicious URLs and Analyze Email Contain.</p>
        <div className="flex justify-center mb-8">
          <div className="border-b-2 border-gray-200">
            <button onClick={() => setActiveTab('URL SCANNER')} className={`px-4 py-2 ${activeTab === 'URL SCANNER' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>URL Scanner</button>
            <button onClick={() => setActiveTab('Email Content Analyzer')} className={`px-4 py-2 ${activeTab === 'Email Content Analyzer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Email Content Analyzer</button>
            <button onClick={() => setActiveTab('Classification')} className={`px-4 py-2 ${activeTab === 'Classification' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Classification</button>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <input type="text" placeholder="Paste the URL" className="border border-gray-300 rounded-l-full px-4 py-2 w-1/2" />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-full">Scan</button>
        </div>
        <div className="bg-blue-100 py-8">
          <div className="flex justify-around">
            <div className="text-center">
              <i className="fas fa-circle text-4xl text-blue-600"></i>
              <p className="text-2xl font-bold mt-2">2,053,219</p>
              <p className="text-gray-600">Scans in the Last 24 Hours</p>
            </div>
            <div className="text-center">
              <i className="fas fa-user text-4xl text-blue-600"></i>
              <p className="text-2xl font-bold mt-2">37,639</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <i className="fas fa-users text-4xl text-blue-600"></i>
              <p className="text-2xl font-bold mt-2">6,252</p>
              <p className="text-gray-600">Active Organizations</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around py-12">
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Ready to get started on CheckPhish?</h2>
            <p className="text-gray-600 mb-4">Don't let typosquatting attacks compromise your online security. Get started today and take proactive steps towards protecting your domains across web and email.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Sign up</button>
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Read Our Blog</h2>
            <p className="text-gray-600 mb-4">Get the latest research and thought leadership about typosquatting, domain monitoring, and phishing protection.</p>
            <a href="#" className="text-blue-600">Learn more</a>
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Easy Product Guides</h2>
            <p className="text-gray-600 mb-4">Self-guided documentation gives you step-by-step support to quick integration or issue resolution.</p>
            <a href="#" className="text-blue-600">Knowledge Base</a>
          </div>
        </div>
      </main>
    );
  }

export default MainContainer