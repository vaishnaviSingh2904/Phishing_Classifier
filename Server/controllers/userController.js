const User = require('../models/User');

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;
    
    try {
        // Build user object
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        
        // Check if email already exists
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.user.id) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }
        
        let user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields },
            { new: true }
        ).select('-password');
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
        const user = await User.findById(req.user.id);
        
        if (!user || !(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};