// This file defines your User schema and model.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    // user_id will be handled by Mongoose's default _id
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100 // Corresponds to VARCHAR(100)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email validation
    },
    password: { // Corresponds to password_hash TEXT
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    college: {
        type: String,
        trim: true,
        maxlength: 100 // Corresponds to VARCHAR(100)
    },
    is_premium: {
        type: Boolean,
        default: false // Corresponds to BOOLEAN DEFAULT FALSE
    },
    createdAt: { // Corresponds to created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash the password before saving a new user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
