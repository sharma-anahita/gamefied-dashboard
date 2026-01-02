import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		title: {
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
		completed: {
			type: Boolean,
			default: false
		},
		deadline: {
			type: Date,
			required: false
		}
	},
	{
		timestamps: true
	}
);

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
