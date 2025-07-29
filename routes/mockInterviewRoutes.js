// routes/mockInterviewRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createMockInterview,
    getMyMockInterviews,
    getMockInterviewById,
    updateMockInterview,
    deleteMockInterview
} = require('../controllers/mockInterviewController'); // <-- Ensure this path is correct

router.route('/')
    .post(protect, createMockInterview) // Create mock interview (protected)
    .get(protect, getMyMockInterviews); // Get all mock interviews for user (protected)

router.route('/:id')
    .get(protect, getMockInterviewById) // Get single mock interview by ID (protected)
    .put(protect, updateMockInterview) // Update mock interview by ID (protected)
    .delete(protect, deleteMockInterview); // Delete mock interview by ID (protected)

module.exports = router;