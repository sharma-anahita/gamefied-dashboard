import React from 'react';
import '../../styles/components/common/Loader.css';

const Loader = ({ className = '' }) => (
  <div className={`ui-loader${className ? ' ' + className : ''}`}></div>
);

export default Loader;
