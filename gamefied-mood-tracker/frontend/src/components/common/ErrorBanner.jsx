import React from 'react';
import '../../styles/components/common/ErrorBanner.css';

const ErrorBanner = ({ message, className = '', onClose }) => (
  <div className={`ui-error-banner${className ? ' ' + className : ''}`} role="alert">
    <span className="ui-error-banner__msg">{message}</span>
    {onClose && (
      <button className="ui-error-banner__close" onClick={onClose} aria-label="Close">×</button>
    )}
  </div>
);

export default ErrorBanner;
