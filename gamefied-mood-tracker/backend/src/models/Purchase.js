import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		itemId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'StoreItem',
			required: true,
			index: true
		},
		purchasedAt: {
			type: Date,
			default: Date.now,
			required: true
		}
	},
	{
		timestamps: false
	}
);

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;
