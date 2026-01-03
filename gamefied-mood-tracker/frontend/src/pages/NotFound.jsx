import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404 – Page Not Found</h1>
        <p className="notfound-desc">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="notfound-actions">
          <button className="notfound-btn" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
          <button className="notfound-btn notfound-btn--secondary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
