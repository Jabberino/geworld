'use client';

import dynamic from 'next/dynamic';

const GlobeViz = dynamic(() => import('./GlobeViz'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-blue-400">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
      <div className="text-xl font-mono tracking-widest animate-pulse">INITIALIZING WAR ROOM...</div>
    </div>
  ),
});

export default GlobeViz;
