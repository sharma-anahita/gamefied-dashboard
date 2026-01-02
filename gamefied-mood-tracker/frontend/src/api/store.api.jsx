// src/api/store.api.js

import api from './api.jsx';

export const getStoreItems = async () => {
  return await api.get('/store');
};

export const purchaseItem = async (itemId) => {
  return await api.post('/store/purchase', { itemId });
};

// Note: Backend doesn't have getPurchases endpoint yet
// This would need to be added to backend if needed
export const getPurchases = async () => {
  // Placeholder - backend endpoint doesn't exist
  // Would need: GET /api/store/purchases
  throw new Error('getPurchases endpoint not implemented in backend');
};