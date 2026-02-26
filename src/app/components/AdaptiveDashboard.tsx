'use client';

import React, { useState, useEffect } from 'react';
import './dashboard.css';

interface LayoutState {
  isMobile: boolean;
  isTablet: boolean;
  dashboardPosition: 'top' | 'left' | 'right' | 'hidden';
}

let C1Chat: any = null;

const AdaptiveDashboard: React.FC = () => {
  const [layout, setLayout] = useState<LayoutState>({
    isMobile: false,
    isTablet: false,
    dashboardPosition: 'left',
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load C1Chat dynamically on client side
    if (typeof window !== 'undefined' && !C1Chat) {
      try {
        const mod = require('@thesysdev/genui-sdk');
        C1Chat = mod.C1Chat || mod.default || mod;
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load C1Chat:', err);
      }
    } else {
      setIsLoaded(true);
    }

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
        {isLoaded && C1Chat ? (
          <C1Chat
            apiUrl="/api/chat"
            theme={{ mode: 'dark' }}
          />
        ) : (
          <div style={{ padding: '20px', color: '#fff' }}>Loading chat...</div>
        )}
      </div>
    </div>
  );
};

export default AdaptiveDashboard;
