'use client';

import { C1Chat } from '@thesysai/genui-sdk';

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <C1Chat
        apiUrl="/api/chat"
        theme={{ mode: 'dark' }}
        hideLogin={true}
        defaultDashboardPosition="none"
        className="h-full w-full"
      />
    </div>
  );
}
