import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Gamified Mood Tracker API v1.0',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes (clean registration)
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/stats', statsRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Centralized Error Handler (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});