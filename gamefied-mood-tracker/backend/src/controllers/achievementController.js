import UserAchievement from '../models/UserAchievement.js';
import Achievement from '../models/Achievement.js';

// Fetch all achievements unlocked by a user
export const getUserAchievements = async (req, res) => {
    try {
        const userId = req.user._id;
        // Find unlocked achievements for user
        const userAchievements = await UserAchievement.find({ userId }).populate('achievementId');
        // Format response
        const achievements = userAchievements.map(ua => ({
            unlockedAt: ua.unlockedAt,
            ...ua.achievementId._doc
        }));
        return res.status(200).json({ achievements });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch achievements.' });
    }
};
