const express = require('express');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
const { updateAdminProfile } = require('../controllers/adminController');
const User = require('../models/userModel');
const Will = require('../models/willModel');
const router = express.Router();
const userController = require('../controllers/userController');

// Fetch user profile
router.get('/profile', authenticateUser, userController.getProfile);

// Get all users
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Delete a user
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Fetch user wills
router.get('/wills', authenticateUser, async (req, res) => {
    try {
        const wills = await Will.find({ user: req.user.id });
        res.json(wills);
    } catch (error) {
        console.error('Error fetching wills:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;