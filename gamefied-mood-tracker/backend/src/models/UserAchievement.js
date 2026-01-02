import mongoose from 'mongoose';

const userAchievementSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		achievementId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Achievement',
			required: true,
			index: true
		},
		unlockedAt: {
			type: Date,
			default: Date.now,
			required: true
		}
	},
	{
		timestamps: false
	}
);

const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);
export default UserAchievement;
