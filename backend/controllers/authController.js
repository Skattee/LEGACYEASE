const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user is approved
        if (!user.isApproved) {
            return res.status(403).json({ message: 'Your account is pending approval. Please wait for admin approval.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'yoursecretkey',
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                username: user.username,
                isAdmin: user.isAdmin,
                isApproved: user.isApproved
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };