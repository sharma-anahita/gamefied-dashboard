import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/layout/Navbar.css';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/goals', label: 'Goals' },
  { to: '/store', label: 'Store' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/friends', label: 'Friends' },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/dashboard">Moodify</Link>
      </div>
      <ul className="navbar__links">
        {navLinks.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={
                location.pathname.startsWith(link.to)
                  ? 'navbar__link navbar__link--active'
                  : 'navbar__link'
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
