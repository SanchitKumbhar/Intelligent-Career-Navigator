// controllers/skillController.js
const Skill = require('../models/Skill');

const createSkill = async (req, res) => {
    const { skill_name, level, source } = req.body;
    const userId = req.user._id;

    if (!skill_name || !level || !source) {
        return res.status(400).json({ message: 'Skill name, level, and source are required' });
    }

    try {
        const skill = await Skill.create({
            user: userId,
            skill_name,
            level,
            source
        });
        res.status(201).json(skill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMySkills = async (req, res) => {
    try {
        const skills = await Skill.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or not authorized' });
        }
        res.status(200).json(skill);
    } catch (error) {
        console.error('Error fetching skill by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateSkill = async (req, res) => {
    const { skill_name, level, source } = req.body;

    try {
        let skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or not authorized' });
        }

        skill.skill_name = skill_name || skill.skill_name;
        skill.level = level || skill.level;
        skill.source = source || skill.source;

        const updatedSkill = await skill.save();
        res.status(200).json(updatedSkill);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or not authorized' });
        }
        res.status(200).json({ message: 'Skill removed' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createSkill,
    getMySkills,
    getSkillById,
    updateSkill,
    deleteSkill
};