import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserAchievements } from '../controllers/achievementController.js';

const router = express.Router();

// GET /api/achievements - Fetch user achievements (protected)
router.get('/', protect, getUserAchievements);

export default router;
