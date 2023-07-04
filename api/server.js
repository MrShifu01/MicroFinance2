// Imports
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const clientRoutes = require('./routes/clientRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const loanRoutes = require('./routes/loanRoutes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Configurations
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://microfinance-frontend.vercel.app']
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(helmet({
    referrerPolicy: { policy: 'no-referrer-when-downgrade' }
})); // Set various HTTP headers for security

// Routes
app.use('/clients', clientRoutes); // Handle client-related routes
app.use('/loans', loanRoutes); // Handle loan-related routes
app.use('/users', userRoutes); // Handle user-related routes

// Test Route
app.get('/test', (req, res) => {
    res.json("API is working!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
