// Fixed Dashboard.jsx - USE user STATE instead of MOCK_USER
import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'
import Sidebar from '../components/sidebar.jsx';
import Xp from '../components/xp.jsx';
import ProgressBar from '../components/progressBar.jsx';
import streakimg from '../assets/streak-icon.webp'
import Mood from '../components/Mood.jsx';
import levelimg from '../assets/level.png';
import { useState, useEffect } from 'react';

function Dashboard() {
  const username = JSON.parse(localStorage.getItem('username'));
  const [user, setUser] = useState(MOCK_USER);

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <header className="name-display">
            <h2 className='welcome-msg'>Welcome, {username ? username : 'Guest'}!</h2>
            <div className='icons'>
              <div className='for-flex'>
                <img className='level' src={levelimg} alt="" />
                <span>{user.level}</span> {/* FIXED: Use user state */}
              </div>
              <div className='for-flex'>
                <img className='level' src={streakimg} alt="" />
                <span>{user.streak}</span> {/* FIXED: Use user state */}
              </div>
            </div>
          </header>
          <div className="dashboard">
            <div className='xp-related-info'>
               <Xp user={user} />
                <ProgressBar user={user}/>
            </div>
            <p className='last-action'><i>Last login : {user.lastAction}</i></p> {/* FIXED: Use user state */}
            <div className='mood-realted-info'>
              <Mood user={user} setUser={setUser}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
