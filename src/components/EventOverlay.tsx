'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, SkipForward, Clock } from 'lucide-react';

const EventOverlay = () => {
  const { 
    currentEvent, 
    isAutoPlayPaused, 
    autoPlayTimer, 
    setIsAutoPlayPaused, 
    setIsPlaying,
    setCurrentEvent
  } = useStore();

  const handleSkipWait = () => {
    setIsAutoPlayPaused(false);
    setCurrentEvent(null);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsAutoPlayPaused(false);
    setCurrentEvent(null);
    setIsPlaying(false); // Stop autoplay
  };

  return (
    <AnimatePresence>
      {isAutoPlayPaused && currentEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none md:pr-[400px]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
            onClick={handleStop}
          />

          {/* Event Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className={`
              p-6 flex justify-between items-start
              ${currentEvent.type === 'THREAT' ? 'bg-gradient-to-r from-orange-900/50 to-slate-900' :
                currentEvent.type === 'IMPOSITION' ? 'bg-gradient-to-r from-red-900/50 to-slate-900' :
                currentEvent.type === 'RELIEF' ? 'bg-gradient-to-r from-green-900/50 to-slate-900' : 
                'bg-gradient-to-r from-blue-900/50 to-slate-900'}
            `}>
              <div className="flex items-center gap-3">
                {currentEvent.countryCode && currentEvent.countryCode !== 'GLOBAL' && (
                  <img 
                    src={`https://flagcdn.com/w40/${currentEvent.countryCode.toLowerCase()}.png`}
                    alt={currentEvent.countryCode}
                    className="w-10 h-auto rounded shadow-sm"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                    <Clock size={14} />
                    <span className="font-mono">{currentEvent.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {currentEvent.headline}
                  </h2>
                </div>
              </div>
              <button
                onClick={handleStop}
                className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {currentEvent.description}
              </p>

              {/* Countdown Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Resuming in {Math.ceil((100 - autoPlayTimer) / 100 * 15)}s...</span>
                  <button 
                    onClick={handleSkipWait}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <SkipForward size={14} />
                    <span>Skip Wait</span>
                  </button>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${autoPlayTimer}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventOverlay;
