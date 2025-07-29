const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// filepath: /home/sanchit/Desktop/Intelligent Career Navigator /index.js
const mongoose = require('mongoose');
// ...existing code...

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// ...existing code...

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Intelligent Career Navigator!');
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});