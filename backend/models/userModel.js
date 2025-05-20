const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, // Default value for admin status
    },
    isApproved: {
        type: Boolean,
        default: false, // Default value for approval status
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);