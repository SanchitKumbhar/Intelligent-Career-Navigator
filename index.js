const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./dbconfig/db'); // Adjust path if your dbconfig file is named differently or located elsewhere
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define API routes
app.use('/api/auth', authRoutes); // All authentication routes will be prefixed with /api/auth

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
