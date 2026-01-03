import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../utils/user';
import '../styles/pages/Payments.css';

const Payments = () => {
  const { user } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/store/purchases', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch purchases');
        const data = await res.json();
        setPurchases(data.purchases || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="payments-page">
      <h2>Purchase History</h2>
      <div className="coin-balance">
        <span>Current Coins:</span> <span className="coin-amount">{user ? user.coins : 0}</span>
      </div>
      {loading ? (
        <div className="payments-loading">Loading purchases...</div>
      ) : error ? (
        <div className="payments-error">Error: {error}</div>
      ) : (
        <ul className="payments-list">
          {purchases.map(p => (
            <li key={p._id} className="payments-item">
              <div className="payments-item-name">{p.itemId?.name || 'Unknown Item'}</div>
              <div className="payments-item-type">Type: {p.itemId?.type}</div>
              <div className="payments-item-price">Price: {p.itemId?.price} coins</div>
              <div className="payments-item-date">Purchased: {new Date(p.purchasedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Payments;
