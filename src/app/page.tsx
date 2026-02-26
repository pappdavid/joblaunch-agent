'use client';

import { C1Chat } from '@thesysai/genui-sdk';
import AdaptiveDashboard from './components/AdaptiveDashboard';

export default function Home() {
  return (
    <AdaptiveDashboard>
      <C1Chat
        apiUrl="/api/chat"
        theme={{ mode: 'dark' }}
      />
    </AdaptiveDashboard>
  );
}
