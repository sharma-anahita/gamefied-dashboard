// Utility function to calculate XP based on activity type and value
function calculateXP(activityType, value) {
	// Example logic: different activities give different XP multipliers
	const xpMultipliers = {
		moodLog: 10,
		goalComplete: 50,
		achievement: 100,
		purchase: 5
	};
	const multiplier = xpMultipliers[activityType] || 1;
	return value * multiplier;
}

// Utility function to calculate coins based on XP or activity
function calculateCoins(xp) {
	// Example logic: 1 coin per 20 XP
	return Math.floor(xp / 20);
}

module.exports = {
	calculateXP,
	calculateCoins
};
