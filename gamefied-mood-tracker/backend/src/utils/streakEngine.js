// Utility to handle streak logic for mood tracking
// lastDate: Date string (ISO format) of last mood entry
// currentDate: Date string (ISO format) of current mood entry
// currentStreak: integer value of current streak
function updateStreak(lastDate, currentDate, currentStreak) {
	const last = new Date(lastDate);
	const current = new Date(currentDate);
	// Calculate difference in days
	const diffTime = current.setHours(0,0,0,0) - last.setHours(0,0,0,0);
	const diffDays = diffTime / (1000 * 60 * 60 * 24);
	if (diffDays === 1) {
		// Consecutive day, increment streak
		return currentStreak + 1;
	} else if (diffDays > 1) {
		// Missed a day, reset streak
		return 1;
	} else {
		// Same day or invalid (future), keep streak unchanged
		return currentStreak;
	}
}

module.exports = {
	updateStreak
};
