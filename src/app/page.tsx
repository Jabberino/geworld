'use client';

import GlobeViz from '../components/GlobeWrapper';
import Timeline from '../components/Timeline';
import CountryPanel from '../components/CountryPanel';
import IntroModal from '../components/IntroModal';
import HelpButton from '../components/HelpButton';
import InfoTabs from '../components/InfoTabs';
import ReferencesModal from '../components/ReferencesModal';
import ReferencesButton from '../components/ReferencesButton';
import EventOverlay from '../components/EventOverlay';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-900 text-slate-100">
      <IntroModal />

      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <GlobeViz />
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 pointer-events-none w-full h-full">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-slate-900 to-transparent pointer-events-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              TRADEPULSE
            </h1>
            <p className="text-slate-400 mt-1">Global Economic Watch & Real-time Data</p>
          </div>
          <div className="flex items-center gap-3">
            <ReferencesButton />
            <HelpButton />
          </div>
        </div>

        {/* References Modal */}
        <ReferencesModal />

        {/* Event Overlay (Autoplay) */}
        <EventOverlay />

        {/* Left Side Info Tabs */}
        <InfoTabs />

        {/* Side Panel */}
        <div className="pointer-events-auto">
          <CountryPanel />
        </div>

        {/* Bottom Timeline */}
        <div className="pointer-events-auto">
          <Timeline />
        </div>
      </div>
    </main>
  );
}
