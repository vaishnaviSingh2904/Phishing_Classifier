exports.analyzeEmail = async (req, res) => {
    const { emailHeaders } = req.body; // Corrected variable name to camelCase

    if (!emailHeaders) {
        return res.status(400).json({ error: 'Email headers are required!' });
    }

    try {
        // Generate random phishing determination
        const isPhishing = Math.random() > 0.5;
        
        // Generate more realistic confidence score (higher for phishing emails)
        const confidence = isPhishing 
            ? (Math.random() * 0.3 + 0.7).toFixed(2)  // 0.7 - 1.0 for phishing
            : (Math.random() * 0.3 + 0.6).toFixed(2); // 0.6 - 0.9 for legitimate
        
        // Mock response with detailed analysis
        const mockResponse = {
            emailHeaders,
            isPhishing,
            confidence,
            predictionTime: new Date().toISOString(),
            features: {
                suspiciousSender: Math.random() > 0.6,
                containsUrlRedirection: Math.random() > 0.7,
                urgencyLanguage: isPhishing ? Math.random() > 0.4 : Math.random() > 0.8,
                replyToMismatch: isPhishing ? Math.random() > 0.5 : Math.random() > 0.9,
                spfResult: isPhishing ? 
                    (Math.random() > 0.7 ? 'fail' : 'neutral') : 
                    (Math.random() > 0.2 ? 'pass' : 'neutral'),
                dkimResult: isPhishing ? 
                    (Math.random() > 0.6 ? 'fail' : 'neutral') : 
                    (Math.random() > 0.3 ? 'pass' : 'neutral'),
            },
            riskFactors: generateRiskFactors(isPhishing),
            message: isPhishing 
                ? 'This email shows multiple indicators of a phishing attempt.' 
                : 'This email appears to be legitimate based on our analysis.',
        };

        // Add a small delay to simulate network request
        setTimeout(() => {
            res.status(200).json(mockResponse);
        }, 300);
    } catch (error) {
        console.error('Error in mock implementation: ', error.message);
        res.status(500).json({
            error: 'Error in mock implementation.',
            details: error.message,
        });
    }
};

// Helper function to generate realistic risk factors based on phishing status
function generateRiskFactors(isPhishing) {
    const allRiskFactors = [
        'Sender domain does not match display name',
        'Contains suspicious URL redirects',
        'Message contains urgent call to action',
        'Requests sensitive personal information',
        'Contains grammatical or spelling errors',
        'SPF authentication failed',
        'DKIM signature invalid',
        'Sender email is from a newly registered domain',
        'Contains deceptive sender address',
        'Message header inconsistencies detected'
    ];
    
    // For phishing emails, include 3-6 risk factors
    // For legitimate emails, include 0-2 risk factors
    const numFactors = isPhishing 
        ? Math.floor(Math.random() * 4) + 3  // 3-6 factors
        : Math.floor(Math.random() * 3);     // 0-2 factors
    
    // Shuffle and take the first n elements
    return allRiskFactors
        .sort(() => Math.random() - 0.5)
        .slice(0, numFactors);
}