const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes'); // Ensure the correct path
const willRoutes = require('./routes/willRoutes'); // Import the will routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const userRoutes = require('./routes/userRoutes'); // Ensure the correct path

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Connect to database
connectDB();

// Routes
app.use('/api/admin', adminRoutes); // Register admin routes
console.log('Admin routes loaded');
app.use('/api', willRoutes); // Register the will routes under the `/api` prefix
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/users', userRoutes); // Register user routes

// Error handling middleware
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});