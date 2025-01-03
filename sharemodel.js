const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registeruser',
        required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    branch: { type: String, required: true },
    passingYear: { type: String, required: true },
    resumeLink: { type: String },
    portfolioLink: { type: String }
});

module.exports = mongoose.model('shares', ShareSchema);
