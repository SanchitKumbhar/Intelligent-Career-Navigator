// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createBooking,
    getMyBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

router.route('/')
    .post(protect, createBooking)
    .get(protect, getMyBookings);

router.route('/:id')
    .get(protect, getBookingById)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

module.exports = router;