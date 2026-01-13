// Utility function to calculate XP based on activity type and value
export function calculateXP(activityType, value) {
  const xpMultipliers = {
    moodLog: 10,
    goalComplete: 50,
    achievement: 100,
    purchase: 5
  };

  const multiplier = xpMultipliers[activityType] || 1;
  return value * multiplier;
}

// Utility function to calculate coins based on XP
export function calculateCoins(xp) {
  return Math.floor(xp / 20);
}

// utils/xpEngine.js
export function handleLevelUp(user) {
  const baseXP = 100;
  let leveledUp = false;
  while (user.xp >= baseXP * user.level) {
    user.xp -= baseXP * user.level;
    user.level += 1;
    leveledUp = true;
  }
  return leveledUp;
}