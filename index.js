// index.js
const express = require('express');
require('dotenv').config();
const dotenv = require('dotenv');
const connectDB = require('./dbconfig/db');

// Import authentication routes - THIS LINE WAS ACCIDENTALLY REMOVED OR COMMENTED
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // All authentication routes will be prefixed with /api/auth

// Routes for new models - make sure these files exist in your routes/ folder
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/mock-interviews', require('./routes/mockInterviewRoutes'));
app.use('/api/mentors', require('./routes/mentorRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));


// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});