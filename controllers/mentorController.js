// controllers/mentorController.js
const Mentor = require('../models/mentor'); 


const createMentor = async (req, res) => {
    const { name, email, domain, college, available } = req.body;

    if (!name || !email || !domain) {
        return res.status(400).json({ message: 'Name, email, and domain are required for mentor' });
    }

    try {
        const mentorExists = await Mentor.findOne({ email });
        if (mentorExists) {
            return res.status(400).json({ message: 'Mentor with this email already exists' });
        }

        const mentor = await Mentor.create({
            name,
            email,
            domain,
            college,
            available
        });
        res.status(201).json(mentor);
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find({});
        res.status(200).json(mentors);
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json(mentor);
    } catch (error) {
        console.error('Error fetching mentor by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateMentor = async (req, res) => {
    const { name, email, domain, college, available } = req.body;

    try {
        let mentor = await Mentor.findById(req.params.id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        mentor.name = name || mentor.name;
        mentor.email = email || mentor.email;
        mentor.domain = domain || mentor.domain;
        mentor.college = college || mentor.college;
        mentor.available = available !== undefined ? available : mentor.available;

        const updatedMentor = await mentor.save();
        res.status(200).json(updatedMentor);
    } catch (error) {
        console.error('Error updating mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndDelete(req.params.id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json({ message: 'Mentor removed' });
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createMentor,
    getAllMentors,
    getMentorById,
    updateMentor,
    deleteMentor
};
