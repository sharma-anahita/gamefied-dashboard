import Achievement from '../models/Achievement.js';
import UserAchievement from '../models/UserAchievement.js';
import Mood from '../models/Mood.js';
import Goal from '../models/Goal.js';

// Helper to check if achievement is already unlocked
async function isAchievementUnlocked(userId, achievementId) {
	const unlocked = await UserAchievement.findOne({ userId, achievementId });
	return !!unlocked;
}

// Main function to check and unlock achievements for a user
export async function checkAndUnlockAchievements(user) {
	// Get all achievements
	const achievements = await Achievement.find({});
	const unlockedAchievements = [];

	// Gather user stats
	const streak = user.streak || 0;
	const goalsCompleted = await Goal.countDocuments({ userId: user._id, completed: true });
	const moodsLogged = await Mood.countDocuments({ userId: user._id });

	for (const achievement of achievements) {
		// Prevent duplicates
		const alreadyUnlocked = await isAchievementUnlocked(user._id, achievement._id);
		if (alreadyUnlocked) continue;

		// Example condition parsing (simple string match)
		let unlock = false;
		if (achievement.condition.startsWith('streak:')) {
			const required = parseInt(achievement.condition.split(':')[1], 10);
			if (streak >= required) unlock = true;
		} else if (achievement.condition.startsWith('goals:')) {
			const required = parseInt(achievement.condition.split(':')[1], 10);
			if (goalsCompleted >= required) unlock = true;
		} else if (achievement.condition.startsWith('moods:')) {
			const required = parseInt(achievement.condition.split(':')[1], 10);
			if (moodsLogged >= required) unlock = true;
		}

		if (unlock) {
			// Unlock achievement
			const userAchievement = new UserAchievement({
				userId: user._id,
				achievementId: achievement._id,
				unlockedAt: new Date()
			});
			await userAchievement.save();
			unlockedAchievements.push(achievement);
		}
	}
	return unlockedAchievements;
}
