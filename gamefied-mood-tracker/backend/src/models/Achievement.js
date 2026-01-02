import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100
		},
		description: {
			type: String,
			trim: true,
			maxlength: 500
		},
		condition: {
			type: String,
			required: true,
			trim: true,
			maxlength: 200
		},
		xpReward: {
			type: Number,
			required: true,
			min: 0
		}
	},
	{
		timestamps: true
	}
);

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
