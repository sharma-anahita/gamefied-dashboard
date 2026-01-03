import React from 'react';
import '../../styles/components/common/Modal.css';

const Modal = ({ visible, onClose, children, className = '' }) => {
  if (!visible) return null;
  return (
    <div className="ui-modal__overlay" onClick={onClose}>
      <div className={`ui-modal__container${className ? ' ' + className : ''}`} onClick={e => e.stopPropagation()}>
        <button className="ui-modal__close" onClick={onClose} aria-label="Close">×</button>
        <div className="ui-modal__content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
