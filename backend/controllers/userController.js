const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('email name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            email: user.email,
            fullName: user.name // always send as fullName
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};