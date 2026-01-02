import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getWeeklyStats, getMonthlyStats } from '../controllers/statsController.js';

const router = express.Router();

// GET /api/stats/weekly - Weekly stats (protected)
router.get('/weekly', protect, getWeeklyStats);

// GET /api/stats/monthly - Monthly stats (protected)
router.get('/monthly', protect, getMonthlyStats);

export default router;
