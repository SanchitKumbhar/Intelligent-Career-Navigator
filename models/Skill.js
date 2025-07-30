// models/Skill.js
const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skill_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    source: {
        type: String,
        enum: ['Resume', 'Interview', 'Manual'],
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;