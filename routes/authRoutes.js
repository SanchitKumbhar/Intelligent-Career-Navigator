const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route (only accessible with a valid JWT)
// You can create a new file like routes/userRoutes.js for user-specific protected routes
router.get('/profile', protect, (req, res) => {
    // req.user will contain the user data from the authenticated token
    res.json({
        message: 'You have access to this protected route!',
        user: req.user,
    });
});

module.exports = router;
