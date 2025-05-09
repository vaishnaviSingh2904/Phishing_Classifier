exports.scanUrl = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required!' });
    }

    try {
        // Mock response simulating the ML service instead of making an actual API call
        const mockResponse = {
            url: url,
            isPhishing: Math.random() > 0.5, // Randomly decide if it's phishing
            confidence: (Math.random() * 0.5 + 0.5).toFixed(2), // Random confidence between 0.5 and 1.0
            predictionTime: new Date().toISOString(),
            features: {
                domainAge: Math.floor(Math.random() * 3650), // Domain age in days (up to ~10 years)
                hasHttps: Math.random() > 0.3, // Most URLs have HTTPS these days
                urlLength: url.length,
                numberOfSubdomains: Math.floor(Math.random() * 3),
                hasSpecialChars: Math.random() > 0.5
            },
            message: 'This is a mock response for URL scanning.'
        };

        // Add a small delay to simulate network request (optional)
        setTimeout(() => {
            res.status(200).json(mockResponse);
        }, 300);
    } catch (error) {
        console.error('Error in mock implementation:', error.message);
        res.status(500).json({
            error: 'Error in mock implementation.',
            details: error.message,
        });
    }
};