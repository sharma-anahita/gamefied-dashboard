import Mood from '../models/Mood.js';
import User from '../models/User.js';

// Helper to get start date for period
function getStartDate(period) {
	const now = new Date();
	if (period === 'week') {
		now.setDate(now.getDate() - 7);
	} else if (period === 'month') {
		now.setMonth(now.getMonth() - 1);
	}
	now.setHours(0, 0, 0, 0);
	return now;
}

// Weekly stats endpoint
export const getWeeklyStats = async (req, res) => {
	await getStats(req, res, 'week');
};

// Monthly stats endpoint
export const getMonthlyStats = async (req, res) => {
	await getStats(req, res, 'month');
};

// Core stats logic
async function getStats(req, res, period) {
	try {
		const userId = req.user._id;
		const startDate = getStartDate(period);

		// Mood frequency aggregation
		const moodFreq = await Mood.aggregate([
			{ $match: { userId, createdAt: { $gte: startDate } } },
			{ $group: { _id: '$mood', count: { $sum: 1 } } }
		]);

		// XP gained aggregation
		const user = await User.findById(userId);
		// Find XP at start of period
		const moods = await Mood.find({ userId, createdAt: { $gte: startDate } }).sort({ createdAt: 1 });
		let xpGained = 0;
		if (moods.length > 0) {
			// Sum XP rewards for moods in period
			xpGained = moods.reduce((sum, mood) => sum + (typeof mood.getXPReward === 'function' ? mood.getXPReward() : 0), 0);
		}

		// Streak info
		const streak = user.streak || 0;

		return res.status(200).json({
			moodFrequency: moodFreq,
			xpGained,
			streak
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to fetch stats.' });
	}
}
