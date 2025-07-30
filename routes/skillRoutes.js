// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createSkill,
    getMySkills,
    getSkillById,
    updateSkill,
    deleteSkill
} = require('../controllers/skillController');

router.route('/')
    .post(protect, createSkill)
    .get(protect, getMySkills);

router.route('/:id')
    .get(protect, getSkillById)
    .put(protect, updateSkill)
    .delete(protect, deleteSkill);

module.exports = router;