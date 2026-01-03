import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/layout/Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">Mood Tracker</div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/goals" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Goals
          </NavLink>
        </li>
        <li>
          <NavLink to="/store" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Store
          </NavLink>
        </li>
        <li>
          <NavLink to="/achievements" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Achievements
          </NavLink>
        </li>
        <li>
          <NavLink to="/payments" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Payments
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
