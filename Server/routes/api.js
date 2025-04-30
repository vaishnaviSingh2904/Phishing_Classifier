const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../Middleware/auth');
const { scanUrl } = require('../controllers/urlController')
const { analyzeEmail } = require('../controllers/emailController')
const { getProfile, updateProfile, changePassword } = require('../controllers/userController')
// Health check
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running successfully!' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/scan-url', auth, scanUrl);
router.post('/analyze-email', auth, analyzeEmail);

//User profile routes (Protected) 
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);


module.exports = router;