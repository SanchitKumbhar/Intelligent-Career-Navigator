// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createResume,
    getMyResumes,
    getResumeById,
    updateResume,
    deleteResume
} = require('../controllers/resumeController');

router.route('/')
    .post(protect, createResume)
    .get(protect, getMyResumes);

router.route('/:id')
    .get(protect, getResumeById)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

module.exports = router;