const mongoose = require('mongoose');

const willSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: String,
    alsoKnownAs: String,
    omangNumber: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: Date,
    maritalStatus: String,
    spouseName: String,
    spouseAddress: String,
    spouseDateOfBirth: Date,
    spouseOmangNumber: String,
    childrenInfo: String,
    moreChildren: String,
    realEstateInfo: String,
    executorName: String,
    executorAddress: String,
    executorRelationship: String,
    title: String,
    content: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Will', willSchema);