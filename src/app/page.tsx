'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load the embed widget script
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { embedWidget } from 'https://cdn.jsdelivr.net/npm/agent-embed-widget/dist/agent-embed-widget.es.js';
      
      embedWidget({
        type: 'tray',
        url: 'https://console.thesys.dev/app/mwU0BZMZUSGbqM_h-B0MA',
        theme: 'dark',
      });
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-6">JobLaunch</h1>
        <p className="text-xl text-gray-300 mb-8">
          AI-powered job search and application assistant
        </p>
        <p className="text-gray-400 text-lg">
          Click the chat button in the bottom-right corner to start
        </p>
      </div>
    </div>
  );
}
