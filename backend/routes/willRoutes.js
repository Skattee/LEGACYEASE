const express = require('express');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware'); // Import authenticateAdmin
const authMiddleware = authenticateUser; // Add this line
const Will = require('../models/willModel'); // Ensure the correct path to the Will model
const willController = require('../controllers/willController');
const router = express.Router();

// POST route to create a new will
router.post('/wills', authenticateUser, async (req, res) => {
    console.log('POST /api/wills route hit');
    console.log('Request body:', req.body);

    const {
        fullName,
        alsoKnownAs,
        omangNumber,
        address,
        phoneNumber,
        dateOfBirth,
        maritalStatus,
        spouseName,
        spouseAddress,
        spouseDateOfBirth,
        spouseOmangNumber,
        childrenInfo,
        moreChildren,
        realEstateInfo,
        executorName,
        executorAddress,
        executorRelationship,
        title, // Add title
        content, // Add content
    } = req.body;

    // Validate required fields
    if (
        !fullName ||
        !omangNumber ||
        !address ||
        !phoneNumber ||
        !dateOfBirth ||
        !maritalStatus ||
        !executorName ||
        !executorAddress ||
        !executorRelationship ||
        !title || // Validate title
        !content // Validate content
    ) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    try {
        // Create a new will
        const newWill = new Will({
            user: req.user.id, // Associate the will with the authenticated user
            fullName,
            alsoKnownAs,
            omangNumber,
            address,
            phoneNumber,
            dateOfBirth,
            maritalStatus,
            spouseName,
            spouseAddress,
            spouseDateOfBirth,
            spouseOmangNumber,
            childrenInfo,
            moreChildren,
            realEstateInfo,
            executorName,
            executorAddress,
            executorRelationship,
            title,
            content,
        });

        await newWill.save();
        res.status(201).json({ message: 'Will submitted successfully', will: newWill });
    } catch (error) {
        console.error('Error submitting will:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/wills', authenticateUser, async (req, res) => {
    try {
        const wills = await Will.find().populate('user', 'email'); // Populate the user field with the email
        res.json(wills);
    } catch (error) {
        console.error('Error fetching wills:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/wills', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `authenticateUser` middleware sets `req.user`
        const userWills = await Will.find({ user: userId });

        res.json(userWills);
    } catch (error) {
        console.error('Error fetching user wills:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/wills/:id/approve', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const will = await Will.findById(id);

        if (!will) {
            return res.status(404).json({ message: 'Will not found' });
        }

        will.status = 'Approved';
        await will.save();

        res.json({ message: `Will with ID ${id} approved successfully.` });
    } catch (error) {
        console.error('Error approving will:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Decline a will
router.post('/wills/:id/decline', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const will = await Will.findById(id);

        if (!will) {
            return res.status(404).json({ message: 'Will not found' });
        }

        will.status = 'Declined';
        await will.save();

        res.json({ message: `Will with ID ${id} declined successfully.` });
    } catch (error) {
        console.error('Error declining will:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/decline', authenticateAdmin, async (req, res) => {
    try {
        const will = await Will.findById(req.params.id);
        if (!will) {
            return res.status(404).json({ message: 'Will not found' });
        }

        // Update the will's status to "Declined"
        will.status = 'Declined';
        await will.save();

        res.json({ message: 'Will declined successfully' });
    } catch (error) {
        console.error('Error declining will:', error);
        res.status(500).json({ message: 'Failed to decline will' });
    }
});

router.get('/wills/:willId/download', authMiddleware, willController.downloadWill);

module.exports = router;