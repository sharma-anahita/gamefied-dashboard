// Dashboard.jsx
import '../styles/dashboard.css';
import MOCK_USER from '../utils/user.js'
import Sidebar from '../components/sidebar.jsx';
import Xp from '../components/xp.jsx';
import ProgressBar from '../components/progressBar.jsx';
import streakimg from '../assets/streak-icon.webp'
import Mood from '../components/Mood.jsx';
import levelimg from '../assets/level.png'
function Dashboard() {
  const username = JSON.parse(localStorage.getItem('username'));

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        < Sidebar />
        <div className="dashboard-content">
          <header className="name-display">
            <h2 className='welcome-msg'>Welcome, {username ? username : 'Guest'}!</h2>
            <div className='icons'>
              <div className='for-flex' >
                <img className='level' src={levelimg} alt="" />
                <span>{MOCK_USER.level}</span>
              </div>
              <div className='for-flex'>
                <img className='level' src={streakimg} alt="" />
                <span>{MOCK_USER.streak}</span>
              </div>

              
            </div>
            
          </header>
          <div className="dashboard">
            <div className='xp-related-info'>
               <Xp />
                <ProgressBar/>
            </div>
            <p className='last-action'><i>Last login : {MOCK_USER.lastAction}</i></p>
            <div className='mood-realted-info'>
              < Mood/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
