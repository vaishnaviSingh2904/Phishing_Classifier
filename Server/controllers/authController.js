const User = require('../models/User');

exports.register = async (req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({error : 'All fields are required.'})
    }

    try {
        const userExists = await User.findOne({ email});
        if(userExists) 
            return res.status(400).json({error : 'All fields are required.'})

        const user = await User.create({name,email,password});
        res.status(201).json({message : 'User registerd successfully!'})
    } catch(err) {
        res.status(500).json({error : 'Server error.'})
    }
};

exports.login = async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({error : 'All fields are required.'})

    try {
        const user = await User.findOne({email});

        if(!user || !(await User.matchPassword(password))) {
            return res.status(401).json({error : 'invalid Credentials'})
        }

        return res.status(200).status({message : 'Login Succesfull'})
    } catch(err) {
        return res.staus(500).json({error :`Server Error ${err}`})
    }
}