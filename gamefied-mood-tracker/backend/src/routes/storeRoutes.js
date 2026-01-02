import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { listStoreItems, purchaseItem } from '../controllers/storeController.js';

const router = express.Router();

// GET /api/store - List store items (protected)
router.get('/', protect, listStoreItems);

// POST /api/store/purchase - Purchase item (protected)
router.post('/purchase', protect, purchaseItem);

export default router;
