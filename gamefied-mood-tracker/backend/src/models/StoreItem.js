import mongoose from 'mongoose';

const storeItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100
		},
		type: {
			type: String,
			required: true,
			enum: ['theme', 'avatar', 'background']
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},
		metadata: {
			type: Object,
			default: {}
		}
	},
	{
		timestamps: true
	}
);

const StoreItem = mongoose.model('StoreItem', storeItemSchema);
export default StoreItem;
