// controllers/resumeController.js
const Resume = require('../models/Resume');

const createResume = async (req, res) => {
    const { file_path, score, feedback, version } = req.body;
    const userId = req.user._id;

    if (!file_path) {
        return res.status(400).json({ message: 'File path is required' });
    }

    try {
        const resume = await Resume.create({
            user: userId,
            file_path,
            score,
            feedback,
            version
        });
        res.status(201).json(resume);
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ uploaded_at: -1 });
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or not authorized' });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error('Error fetching resume by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateResume = async (req, res) => {
    const { file_path, score, feedback, version } = req.body;

    try {
        let resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or not authorized' });
        }

        resume.file_path = file_path || resume.file_path;
        resume.score = score !== undefined ? score : resume.score;
        resume.feedback = feedback !== undefined ? feedback : resume.feedback;
        resume.version = version || resume.version;

        const updatedResume = await resume.save();
        res.status(200).json(updatedResume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or not authorized' });
        }
        res.status(200).json({ message: 'Resume removed' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createResume,
    getMyResumes,
    getResumeById,
    updateResume,
    deleteResume
};