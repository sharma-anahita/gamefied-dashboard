import StoreItem from '../models/StoreItem.js';
import User from '../models/User.js';
import Purchase from '../models/Purchase.js';

// List all store items
export const listStoreItems = async (req, res) => {
	try {
		const items = await StoreItem.find({}).sort({ price: 1, createdAt: -1 });
		return res.status(200).json({ items });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to fetch store items.' });
	}
};

// Purchase an item using coins
export const purchaseItem = async (req, res) => {
	try {
		const userId = req.user._id;
		const { itemId } = req.body;

		// Find item
		const item = await StoreItem.findById(itemId);
		if (!item) {
			return res.status(404).json({ message: 'Store item not found.' });
		}

		// Find user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		// Check if user has enough coins
		if (user.coins < item.price) {
			return res.status(400).json({ message: 'Not enough coins to purchase item.' });
		}

		// Deduct coins
		user.coins -= item.price;
		await user.save();

		// Save purchase
		const purchase = new Purchase({
			userId,
			itemId,
			purchasedAt: new Date()
		});
		await purchase.save();

		return res.status(201).json({ message: 'Item purchased successfully.', purchase, coins: user.coins });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to purchase item.' });
	}
};
