// controllers/mockInterviewController.js
const MockInterview = require('../models/MockInterview');

// @desc    Create a new mock interview
// @route   POST /api/mock-interviews
// @access  Private
const createMockInterview = async (req, res) => {
    const { mode, score, feedback, keywords_matched } = req.body;
    const userId = req.user._id; // Get user ID from authenticated request

    if (!mode) {
        return res.status(400).json({ message: 'Mode is required' });
    }

    try {
        const mockInterview = await MockInterview.create({
            user: userId,
            mode,
            score,
            feedback,
            keywords_matched
        });
        res.status(201).json(mockInterview);
    } catch (error) {
        console.error('Error creating mock interview:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all mock interviews for the authenticated user
// @route   GET /api/mock-interviews
// @access  Private
const getMyMockInterviews = async (req, res) => {
    try {
        const mockInterviews = await MockInterview.find({ user: req.user._id }).sort({ interview_date: -1 });
        res.status(200).json(mockInterviews);
    } catch (error) {
        console.error('Error fetching mock interviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single mock interview by ID for the authenticated user
// @route   GET /api/mock-interviews/:id
// @access  Private
const getMockInterviewById = async (req, res) => {
    try {
        const mockInterview = await MockInterview.findOne({ _id: req.params.id, user: req.user._id });

        if (!mockInterview) {
            return res.status(404).json({ message: 'Mock interview not found or not authorized' });
        }
        res.status(200).json(mockInterview);
    } catch (error) {
        console.error('Error fetching mock interview by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a mock interview for the authenticated user
// @route   PUT /api/mock-interviews/:id
// @access  Private
const updateMockInterview = async (req, res) => {
    const { mode, score, feedback, keywords_matched } = req.body;

    try {
        let mockInterview = await MockInterview.findOne({ _id: req.params.id, user: req.user._id });

        if (!mockInterview) {
            return res.status(404).json({ message: 'Mock interview not found or not authorized' });
        }

        mockInterview.mode = mode || mockInterview.mode;
        mockInterview.score = score !== undefined ? score : mockInterview.score;
        mockInterview.feedback = feedback !== undefined ? feedback : mockInterview.feedback;
        mockInterview.keywords_matched = keywords_matched !== undefined ? keywords_matched : mockInterview.keywords_matched;

        const updatedMockInterview = await mockInterview.save();
        res.status(200).json(updatedMockInterview);
    } catch (error) {
        console.error('Error updating mock interview:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a mock interview for the authenticated user
// @route   DELETE /api/mock-interviews/:id
// @access  Private
const deleteMockInterview = async (req, res) => {
    try {
        const mockInterview = await MockInterview.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!mockInterview) {
            return res.status(404).json({ message: 'Mock interview not found or not authorized' });
        }
        res.status(200).json({ message: 'Mock interview removed' });
    } catch (error) {
        console.error('Error deleting mock interview:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createMockInterview,
    getMyMockInterviews,
    getMockInterviewById,
    updateMockInterview,
    deleteMockInterview
};