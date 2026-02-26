'use client';

import React, { useState, useEffect } from 'react';
const C1Chat = require('@thesysdev/genui-sdk').C1Chat;
import './dashboard.css';

interface LayoutState {
  isMobile: boolean;
  isTablet: boolean;
  dashboardPosition: 'top' | 'left' | 'right' | 'hidden';
}

const AdaptiveDashboard: React.FC = () => {
  const [layout, setLayout] = useState<LayoutState>({
    isMobile: false,
    isTablet: false,
    dashboardPosition: 'left',
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      setLayout({
        isMobile,
        isTablet,
        dashboardPosition: isMobile ? 'top' : isTablet ? 'right' : 'left',
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!C1Chat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="adaptive-container">
      {layout.dashboardPosition !== 'hidden' && (
        <div className={`fixed-dashboard dashboard-${layout.dashboardPosition}`}>
          <div className="dashboard-content">
            <h2>Job Dashboard</h2>
            <div className="dashboard-stats">
              <div className="stat-item">
                <div className="stat-label">Applications</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Profiles</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">CVs</div>
                <div className="stat-value">0</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`chatbox-wrapper wrapper-${layout.dashboardPosition}`}>
        <C1Chat
          apiUrl="/api/chat"
          theme={{ mode: 'dark' }}
        />
      </div>
    </div>
  );
};

export default AdaptiveDashboard;
