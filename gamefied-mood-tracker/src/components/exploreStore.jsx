import { useState } from 'react';
import '../styles/dashboard.css';

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
            <div className="coins-display" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.2rem'
            }}>
              <span>💰</span>
              <span>{userCoins} coins</span>
            </div>
          </header>

          <div className="store-categories" style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === category ? '2px solid #00c3ff' : '1px solid #555',
                  backgroundColor: selectedCategory === category ? '#00c3ff20' : '#1a1a2e',
                  color: selectedCategory === category ? '#00c3ff' : 'white',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="store-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredItems.map(item => (
              <div key={item.id} className="store-item" style={{
                padding: '20px',
                backgroundColor: '#16213e',
                borderRadius: '12px',
                border: '1px solid #00c3ff',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div className="item-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <h3 style={{ color: 'white', margin: 0 }}>{item.name}</h3>
                </div>
                
                <p style={{ color: '#ccc', margin: 0, fontSize: '0.9rem' }}>
                  {item.description}
                </p>
                
                <div className="item-footer" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <span style={{ 
                    color: '#ffaa00', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    💰 {item.price}
                  </span>
                  
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={userCoins < item.price}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: userCoins >= item.price ? '#00c3ff' : '#555',
                      color: 'white',
                      cursor: userCoins >= item.price ? 'pointer' : 'not-allowed',
                      opacity: userCoins >= item.price ? 1 : 0.6
                    }}
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
