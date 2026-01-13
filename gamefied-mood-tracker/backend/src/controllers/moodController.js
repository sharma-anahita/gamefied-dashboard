import Mood from '../models/Mood.js';
import User from '../models/User.js';
import { calculateXP, calculateCoins, handleLevelUp } from '../utils/xpEngine.js';
import { updateStreak } from '../utils/streakEngine.js';

// Add mood controller
export const addMood = async (req, res) => {
	try {
		const userId = req.user._id;
		const { mood, note } = req.body;
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Prevent duplicate daily entry
		const existingMood = await Mood.findMoodForDate(userId, today);
		if (existingMood) {
			return res.status(400).json({ message: 'Mood already logged for today.' });
		}

		// Save mood
		const newMood = new Mood({
			userId,
			mood,
			note,
			moodDate: today
		});
		await newMood.save();

		// Update streak
		const user = await User.findById(userId);
		let newStreak = user.streak || 0;
		if (user.lastMoodDate) {
			newStreak = updateStreak(user.lastMoodDate, today, user.streak);
		} else {
			newStreak = 1;
		}
		user.streak = newStreak;
		user.lastMoodDate = today;

		// Add XP and coins
		// Use Mood instance methods if available, else fallback to utility
		let xpReward = 0;
		let coinReward = 0;
		if (typeof newMood.getXPReward === 'function') {
			xpReward = newMood.getXPReward();
		} else {
			xpReward = calculateXP('moodLog', 1);
		}
		if (typeof newMood.getCoinReward === 'function') {
			coinReward = newMood.getCoinReward();
		} else {
			coinReward = calculateCoins(xpReward);
		}
		user.xp += xpReward;
		user.coins += coinReward;
		handleLevelUp(user);

		await user.save();

		return res.status(201).json({
			message: 'Mood added successfully.',
			mood: newMood,
			streak: user.streak,
			xp: user.xp,
			coins: user.coins,
			level: user.level
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to add mood.' });
	}
};
