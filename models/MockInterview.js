// models/MockInterview.js
const mongoose = require('mongoose');

const MockInterviewSchema = new mongoose.Schema({
    // interview_id will be handled by Mongoose's default _id
    user: { // Corresponds to user_id INT, FOREIGN KEY (user_id) REFERENCES Users(user_id)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the 'User' model
        required: true
    },
    mode: { // Corresponds to mode ENUM('General', 'Domain-Specific', 'Club Custom')
        type: String,
        enum: ['General', 'Domain-Specific', 'Club Custom'],
        required: true
    },
    score: { // Corresponds to score INT
        type: Number,
        default: null // Can be null if not yet scored
    },
    feedback: { // Corresponds to feedback TEXT
        type: String,
        default: null // Can be null if no feedback yet
    },
    keywords_matched: { // Corresponds to keywords_matched TEXT
        type: String,
        default: null // Can be null
    },
    interview_date: { // Corresponds to interview_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        type: Date,
        default: Date.now
    }
});

const MockInterview = mongoose.model('MockInterview', MockInterviewSchema);

module.exports = MockInterview;