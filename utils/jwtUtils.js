// This file handles JWT token generation.
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const generateToken = (id) => {
    // Sign the JWT with the user ID and a secret key.
    // The secret key should be stored securely in environment variables.
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

module.exports = generateToken;
