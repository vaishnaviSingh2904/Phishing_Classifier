const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/authController')

router.get('/health', (req,res) => {
    res.status(200).json(
        {message : 'API is running successfully! '}
    );
})

router.post('/scan-url', (req,res) => {
    const {url} = req.body;

    if(!url) {
        return res.status(400).json({error : 'URL is required!'})
    }
    res.status(200).json({message : `Scanning URL: ${url}`})
})

router.post('/analyze-email', (req,res) => {
    const {emailHeaders} = req.body;

    if(!emailHeaders) {
        return res.status(400).json({error : `Email headers are required!`})
    }

    res.status(200).json({message : 'Email analyzed successfully',headers: emailHeaders})
});

router.post('/register',register);
router.post('/login',login);


module.exports = router;