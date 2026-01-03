import { useState } from 'react';
import '../styles/components/exploreStore.css';

const STORE_ITEMS = [
  { id: 1, name: 'Premium Theme', price: 500, type: 'theme', description: 'Dark cosmic theme with animations', icon: '🎨' },
  { id: 2, name: 'Double XP Boost', price: 200, type: 'boost', description: '2x XP for 24 hours', icon: '⚡' },
  { id: 3, name: 'Streak Shield', price: 300, type: 'protection', description: 'Protects your streak for 3 days', icon: '🛡️' },
  { id: 4, name: 'Custom Avatar', price: 150, type: 'cosmetic', description: 'Unlock custom avatar options', icon: '👤' },
  { id: 5, name: 'Journal Templates', price: 100, type: 'utility', description: 'Beautiful journal templates', icon: '📔' },
  { id: 6, name: 'Mood Analytics', price: 400, type: 'feature', description: 'Advanced mood tracking insights', icon: '📊' },
];

function ExploreStore() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userCoins, setUserCoins] = useState(1250); // Mock user coins

  const categories = ['all', 'theme', 'boost', 'protection', 'cosmetic', 'utility', 'feature'];

  const filteredItems = selectedCategory === 'all' 
    ? STORE_ITEMS 
    : STORE_ITEMS.filter(item => item.type === selectedCategory);

  const handlePurchase = (item) => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      alert(`Successfully purchased ${item.name}!`);
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <div className="dashboard-content">
          <header className="name-display">
            <h2 className='welcome-msg'>Explore Store</h2>
            <div className="coins-display">
              <span>💰</span>
              <span>{userCoins} coins</span>
            </div>
          </header>

          <div className="store-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`store-category-btn${selectedCategory === category ? ' selected' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="store-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="store-item">
                <div className="item-header">
                  <span className="item-icon">{item.icon}</span>
                  <h3 className="item-title">{item.name}</h3>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="item-price">💰 {item.price}</span>
                  <button
                    className="item-buy-btn"
                    onClick={() => handlePurchase(item)}
                    disabled={userCoins < item.price}
                  >
                    {userCoins >= item.price ? 'Buy' : 'Too Expensive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreStore;
