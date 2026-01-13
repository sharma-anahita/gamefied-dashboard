import Goal from '../models/Goal.js';
import User from '../models/User.js';
import { calculateXP, calculateCoins, handleLevelUp } from '../utils/xpEngine.js';
 

// Add a new goal
export const addGoal = async (req, res) => {
	try {
		const userId = req.user._id;
		const { title, description, deadline } = req.body;
		const goal = new Goal({
			userId,
			title,
			description,
			deadline
		});
		await goal.save();
		return res.status(201).json({ message: 'Goal added successfully.', goal });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to add goal.' });
	}
};

// Mark goal as completed and reward XP
export const completeGoal = async (req, res) => {
	try {
		const userId = req.user._id;
		const { goalId } = req.params;
		const goal = await Goal.findOne({ _id: goalId, userId });
		if (!goal) {
			return res.status(404).json({ message: 'Goal not found.' });
		}
		if (goal.completed) {
			return res.status(400).json({ message: 'Goal already completed.' });
		}
		goal.completed = true;
		
		await goal.save();

		// Reward XP to user
		const user = await User.findById(userId);
		const xpReward = calculateXP('goalComplete', 1); // 1 goal completed
		user.xp += xpReward;
		handleLevelUp(user);
		await user.save();

		return res.status(200).json({ message: 'Goal marked as completed.', goal, xpReward, totalXP: user.xp });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to complete goal.' });
	}
};
