// backend/src/index.js - FIXED VERSION

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

// Load environment variables FIRST
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ==========================================
// CORS Configuration - CRITICAL FIX
// ==========================================
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
// app.options('*', cors(corsOptions));

// ==========================================
// Middleware
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ==========================================
// Routes
// ==========================================
// Base test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Gamified Mood Tracker API v1.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      moods: '/api/moods',
      goals: '/api/goals',
      store: '/api/store',
      achievements: '/api/achievements',
      stats: '/api/stats'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: 'connected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/stats', statsRoutes);

// ==========================================
// Error Handlers
// ==========================================
// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`
  });
});

// Centralized Error Handler (should be last)
app.use(errorHandler);

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
  console.log('========================================');
  console.log('');
});