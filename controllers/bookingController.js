// controllers/bookingController.js
const Booking = require('../models/Booking');
const Mentor = require('../models/Mentor'); // Needed to verify mentor existence
const User = require('../models/User'); // Although not directly used for user validation here, good to have if needed for future logic

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { mentor_id, session_time } = req.body;
    const userId = req.user._id; // Get user ID from authenticated request

    // Basic validation for required fields
    if (!mentor_id || !session_time) {
        return res.status(400).json({ message: 'Mentor ID and session time are required' });
    }

    try {
        // 1. Verify mentor existence
        const mentor = await Mentor.findById(mentor_id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // 2. Explicitly parse and validate session_time as a Date object
        const parsedSessionTime = new Date(session_time);

        // Check if the parsed date is valid (e.g., not "Invalid Date")
        if (isNaN(parsedSessionTime.getTime())) {
            return res.status(400).json({ message: 'Invalid session time format. Please use ISO 8601 (e.g., YYYY-MM-DDTHH:mm:ssZ).' });
        }

        // 3. Create the booking
        const booking = await Booking.create({
            user: userId, // User ID comes from the JWT token via authMiddleware
            mentor: mentor_id,
            session_time: parsedSessionTime // Use the validated Date object
        });

        res.status(201).json(booking); // Respond with the created booking
    } catch (error) {
        console.error('Error creating booking:', error);
        // More specific error handling can be added here based on error.name or error.code
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all bookings for the authenticated user
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        // Find bookings associated with the authenticated user
        // .populate('mentor', 'name email domain') will replace the mentor ObjectId with actual mentor details
        // .sort({ session_time: -1 }) sorts by session time in descending order (latest first)
        const bookings = await Booking.find({ user: req.user._id })
                                      .populate('mentor', 'name email domain')
                                      .sort({ session_time: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single booking by ID for the authenticated user
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    try {
        // Find a specific booking by its ID and ensure it belongs to the authenticated user
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id })
                                     .populate('mentor', 'name email domain'); // Populate mentor details

        if (!booking) {
            // If no booking is found or it doesn't belong to the user
            return res.status(404).json({ message: 'Booking not found or not authorized' });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        // Handle invalid ID format (e.g., CastError for _id)
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid booking ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a booking for the authenticated user
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
    const { session_time, feedback } = req.body; // Only allow updating these fields

    try {
        // Find the booking by ID and ensure it belongs to the authenticated user
        let booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or not authorized' });
        }

        // Update fields if provided in the request body
        if (session_time !== undefined) {
            const parsedSessionTime = new Date(session_time);
            if (isNaN(parsedSessionTime.getTime())) {
                return res.status(400).json({ message: 'Invalid session time format for update.' });
            }
            booking.session_time = parsedSessionTime;
        }
        booking.feedback = feedback !== undefined ? feedback : booking.feedback;

        const updatedBooking = await booking.save(); // Save the updated document
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid booking ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a booking for the authenticated user
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
    try {
        // Find and delete the booking by ID, ensuring it belongs to the authenticated user
        const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or not authorized' });
        }
        res.status(200).json({ message: 'Booking removed successfully' }); // Confirmation message
    } catch (error) {
        console.error('Error deleting booking:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid booking ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};