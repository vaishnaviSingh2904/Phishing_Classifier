exports.scanUrl = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required!' });
    }

    try {
        const response = await axios.post('http://localhost:8000/predict',{url});
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error communicating with ML service:', error.message);
        res.status(500).json({
            error: 'Error communicating with ML service.',
            details: error.response?.data || error.message,
        });
    }
};
