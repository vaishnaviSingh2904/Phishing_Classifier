const User = require("../models/User");
const jwt = require("jsonwebtoken");
const scanUrl = require('./urlController')

const generateToken = (user) => {
  return jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
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
