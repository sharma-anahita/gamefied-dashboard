import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addGoal, completeGoal } from '../controllers/goalController.js';
import Goal from '../models/Goal.js';

const router = express.Router();

// POST /api/goals - Add goal (protected)
router.post('/', protect, addGoal);

// PATCH /api/goals/:id/complete - Mark goal completed (protected)
router.patch('/:goalId/complete', protect, completeGoal);

// GET /api/goals - Get all user's goals (protected)
router.get('/', protect, async (req, res) => {
	try {
		const userId = req.user._id;
		const goals = await Goal.find({ userId }).sort({ deadline: 1, createdAt: -1 });
		res.status(200).json({ goals });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch goals.' });
	}
});

export default router;
