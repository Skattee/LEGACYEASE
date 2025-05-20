const User = require('../models/userModel'); // Add this at the top

// Example controller functions
exports.fetchSummary = (req, res) => {
    // Your logic here
    res.json({ message: 'Summary endpoint' });
};

exports.fetchPendingAccounts = (req, res) => {
    // Your logic here
    res.json({ message: 'Pending accounts endpoint' });
};

exports.approveAccount = (req, res) => {
    // Your logic here
    res.json({ message: 'Approve account endpoint' });
};

exports.updateAdminProfile = (req, res) => {
    // Your logic here
    res.json({ message: 'Update admin profile endpoint' });
};

exports.getProfile = async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select('email name');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({
            email: admin.email,
            fullName: admin.name // send as fullName for frontend consistency
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};