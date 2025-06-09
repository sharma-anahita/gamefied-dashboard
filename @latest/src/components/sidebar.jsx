import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import img1 from '../assets/friends-8.png';
import storeimg from "../assets/online-store.png";
import goalsimg from "../assets/goals.png";
import paymentimg from "../assets/payment.png";
import dashboardimg from "../assets/dashboard.png";

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      path: "/dash",
      label: "Dashboard",
      icon: dashboardimg,
      alt: "Dashboard icon"
    },
    {
      path: "/Goals ",
      label: "Goals",
      icon: goalsimg,
      alt: "Games icon"
    },
    {
      path: "/ExploreStore",
      label: "Explore Store",
      icon: storeimg,
      alt: "Store icon"
    },
    {
      path: "/Friends",
      label: "Friends",
      icon: img1,
      alt: "Friends icon"
    },
    {
      path: "/Payments",
      label: "Payments",
      icon: paymentimg,
      alt: "Payment icon"
    }
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">My Journey</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <div className={`links-sidebar ${location.pathname === item.path ? 'active' : ''}`}>
                <img 
                  className='icon' 
                  src={item.icon} 
                  alt={item.alt}
                />
                <Link to={item.path}>{item.label}</Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;