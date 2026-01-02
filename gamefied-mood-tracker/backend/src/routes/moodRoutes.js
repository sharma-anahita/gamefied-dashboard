import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addMood } from '../controllers/moodController.js';
import Mood from '../models/Mood.js';

const router = express.Router();

// POST /api/moods/add - Add mood (protected)
router.post('/add', protect, addMood);

// GET /api/moods/history - Get mood history (protected)
router.get('/history', protect, async (req, res) => {
	try {
		const userId = req.user._id;
		const moods = await Mood.find({ userId }).sort({ moodDate: -1 });
		res.status(200).json({ moods });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch mood history.' });
	}
});

export default router;
