// models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file_path: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        default: null
    },
    feedback: {
        type: String,
        default: null
    },
    version: {
        type: Number,
        default: 1
    },
    uploaded_at: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;