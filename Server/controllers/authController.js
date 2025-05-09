const User = require("../models/User");
const jwt = require("jsonwebtoken");
const scanUrl = require('./urlController')
const { OAuth2Client } = require('google-auth-library');

// Initialize the OAuth2Client with your Google client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already registered" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registerd successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "invalid Credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({ message: "Login Succesfull", token });
  } catch (err) {
    return res.status(500).json({ error: `Server Error ${err}` });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // 'sub' is Google's unique identifier

    // Find or create user in your database
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user with random password (they'll login via Google)
      const randomPassword = Math.random().toString(36).slice(-8);
      user = await User.create({
        name,
        email,
        password: randomPassword,
        googleId: sub // Store Google's ID for this user
      });
    }

    // Generate JWT token using your existing function
    const token = generateToken(user);

    res.status(200).json({ message: "Google Login Successful", token });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({ error: 'Authentication failed' });
  }
};
