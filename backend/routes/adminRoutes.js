const express = require('express');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Will = require('../models/willModel'); // Ensure this is the correct path
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { updateAdminProfile } = require('../controllers/adminController');
const bcrypt = require('bcryptjs');

console.log('adminController:', adminController);
console.log({ updateAdminProfile });

// Define routes with valid callback functions
router.get('/summary', adminController.fetchSummary);
router.get('/pending-accounts', adminController.fetchPendingAccounts);
router.put('/approve-account/:userId', adminController.approveAccount);
router.get('/recent-wills', authenticateUser, async (req, res) => {
    console.log('GET /api/admin/recent-wills route hit');

    try {
        const recentWills = await Will.find().sort({ createdAt: -1 }).limit(10);
        console.log('Recent wills:', recentWills);
        res.status(200).json(recentWills);
    } catch (error) {
        console.error('Error fetching recent wills:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin route to approve a user
router.put('/approve-user/:id', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isApproved = true;
        await user.save();

        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve a pending account
router.put('/:id/approve', authenticateAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's status to approved
        user.isApproved = true;
        const updatedUser = await user.save();

        res.json({ message: 'User approved successfully', user: updatedUser });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Failed to approve user' });
    }
});

router.get('/pending-users', authenticateUser, async (req, res) => {
    try {
        const pendingUsers = await User.find({ isApproved: false });
        res.status(200).json(pendingUsers);
    } catch (error) {
        console.error('Error fetching pending users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Endpoint to get all wills
router.get('/wills', (req, res) => {
    res.json(wills);
});

router.get('/wills/stats', authenticateUser, async (req, res) => {
    try {
        const totalWills = await Will.countDocuments();
        const approvedWills = await Will.countDocuments({ status: 'Approved' });
        const pendingWills = await Will.countDocuments({ status: 'Pending' });

        res.json({
            totalWills,
            approvedWills,
            pendingWills,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/accounts/stats', authenticateUser, async (req, res) => {
    try {
        const pendingAccounts = await User.countDocuments({ isApproved: false });

        res.json({
            pendingAccounts,
        });
    } catch (error) {
        console.error('Error fetching account stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new admin
router.post('/create-admin', authenticateAdmin, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({ name, email, password: hashedPassword, isAdmin: true });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update admin profile
router.put('/profile', authenticateAdmin, updateAdminProfile);

// Get admin profile
router.get('/profile', authenticateAdmin, adminController.getProfile);

module.exports = router;