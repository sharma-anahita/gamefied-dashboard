import React from 'react';
import Navbar from './Navbar';
import '../../styles/components/layout/PageLayout.css';

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-layout__main">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
