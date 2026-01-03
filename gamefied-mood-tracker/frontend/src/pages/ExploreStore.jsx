import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import '../styles/pages/ExploreStore.css';

const ExploreStore = () => {
  const { user, refreshUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/store', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch store items');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePurchase = async (itemId) => {
    setPurchasing(itemId);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/store/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to purchase item');
      }
      await fetchItems();
      refreshUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="explore-store-page">
      <h2>Explore Store</h2>
      {loading ? (
        <div>Loading store items...</div>
      ) : error ? (
        <div className="store-error">Error: {error}</div>
      ) : (
        <div className="store-items-list">
          {items.map(item => (
            <div key={item._id} className="store-item-card">
              <div className="store-item-name">{item.name}</div>
              <div className="store-item-type">Type: {item.type}</div>
              <div className="store-item-price">Price: <span>{item.price} coins</span></div>
              <button
                className="store-item-purchase-btn"
                onClick={() => handlePurchase(item._id)}
                disabled={purchasing === item._id || (user && user.coins < item.price)}
              >
                {purchasing === item._id ? 'Purchasing...' : 'Purchase'}
              </button>
              {user && user.coins < item.price && (
                <div className="store-item-error">Not enough coins</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreStore;
