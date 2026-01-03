import React from 'react';
import '../../styles/components/common/Button.css';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => (
  <button
    type={type}
    className={`ui-btn${className ? ' ' + className : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
