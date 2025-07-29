// routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createMentor,
    getAllMentors,
    getMentorById,
    updateMentor,
    deleteMentor
} = require('../controllers/mentorController');

router.route('/')
    .post(protect, createMentor) // Protected for now (e.g., admin only)
    .get(getAllMentors); // Public for now

router.route('/:id')
    .get(getMentorById) // Public for now
    .put(protect, updateMentor) // Protected
    .delete(protect, deleteMentor); // Protected

module.exports = router;