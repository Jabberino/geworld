'use client';

import { useStore } from '../store/useStore';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PIXELS_PER_DAY = 20;
const START_DATE = new Date('2025-01-01').getTime();
const END_DATE = new Date('2025-12-31').getTime();
const TOTAL_DAYS = 365;
const TOTAL_WIDTH = TOTAL_DAYS * PIXELS_PER_DAY;

const Timeline = () => {
  const { 
    currentDate, 
    setCurrentDate, 
    events, 
    isPlaying, 
    setIsPlaying,
    isAutoPlayPaused,
    setIsAutoPlayPaused,
    setAutoPlayTimer,
    setCurrentEvent
  } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Sync x with global currentDate only during playback
  useEffect(() => {
    if (isDragging) return;

    const current = new Date(currentDate).getTime();
    const daysSinceStart = (current - START_DATE) / (1000 * 60 * 60 * 24);
    const targetX = -daysSinceStart * PIXELS_PER_DAY;

    // Only animate to position during playback, not manual scrolling
    if (isPlaying) {
      animate(x, targetX, { duration: 1, ease: "linear" });
    }
    // Don't animate on manual changes - let user control position freely
  }, [currentDate, isDragging, isPlaying, x]);

  // Auto-play loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isAutoPlayPaused) {
      interval = setInterval(() => {
        const current = new Date(currentDate).getTime();
        const next = current + (1000 * 60 * 60 * 24); // +1 day per tick
        const nextDateStr = new Date(next).toISOString().split('T')[0];

        // Check for event on this new date
        const eventOnDate = events.find(e => e.date === nextDateStr);

        if (eventOnDate) {
          // Pause and show event
          setIsPlaying(false);
          setIsAutoPlayPaused(true);
          setCurrentEvent(eventOnDate);
          setAutoPlayTimer(0);
          setCurrentDate(nextDateStr);
          
          // Select country if applicable
          if (eventOnDate.countryCode && eventOnDate.countryCode !== 'GLOBAL') {
            const country = useStore.getState().countries.find(c => c.code === eventOnDate.countryCode);
            if (country) useStore.getState().setSelectedCountry(country);
          }
        } else if (next > END_DATE) {
          setIsPlaying(false);
        } else {
          setCurrentDate(nextDateStr);
        }
      }, 50); // Fast ticks for smooth play
    } else if (isAutoPlayPaused) {
      // Countdown timer logic
      interval = setInterval(() => {
        const currentTimer = useStore.getState().autoPlayTimer;
        if (currentTimer >= 100) {
          // Resume
          setIsAutoPlayPaused(false);
          setCurrentEvent(null);
          setIsPlaying(true);
        } else {
          // Increment timer (100% over 15 seconds = ~6.6% per second)
          // 50ms tick -> 300 ticks in 15s -> 0.33% per tick
          setAutoPlayTimer(currentTimer + 0.33);
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isAutoPlayPaused, currentDate, events, setCurrentDate, setIsPlaying, setIsAutoPlayPaused, setAutoPlayTimer, setCurrentEvent]);

  const handleDrag = (_: any, info: PanInfo) => {
    const currentX = x.get();
    const daysOffset = -currentX / PIXELS_PER_DAY;
    const newTime = START_DATE + (daysOffset * 1000 * 60 * 60 * 24);

    // Clamp date
    const clampedTime = Math.max(START_DATE, Math.min(END_DATE, newTime));
    const newDate = new Date(clampedTime).toISOString().split('T')[0];

    if (newDate !== currentDate) {
      setCurrentDate(newDate);
    }
  };

  // Generate ticks
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-30 select-none overflow-hidden">

      {/* Center Indicator (The "Needle") */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-red-500/50 z-40 pointer-events-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {currentDate}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-8 z-[200]">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 backdrop-blur-md transition-all"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Draggable Track */}
      <motion.div
        ref={containerRef}
        className="absolute top-12 left-1/2 h-20 flex items-end cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          setIsPlaying(false);
        }}
        onDragEnd={() => setIsDragging(false)}
        onDrag={handleDrag}
      >
        {/* Render Months and Ticks */}
        {Array.from({ length: TOTAL_DAYS }).map((_, i) => {
          const date = new Date(START_DATE + i * 86400000);
          const isFirstOfMonth = date.getDate() === 1;
          const isWeek = date.getDay() === 0; // Sunday

          return (
            <div
              key={i}
              className="relative flex-shrink-0 flex flex-col justify-end items-center"
              style={{ width: PIXELS_PER_DAY }}
            >
              {/* Tick Mark */}
              <div
                className={`w-px ${isFirstOfMonth ? 'h-10 bg-slate-400' : isWeek ? 'h-6 bg-slate-600' : 'h-3 bg-slate-800'}`}
              />

              {/* Month Label */}
              {isFirstOfMonth && (
                <div className="absolute bottom-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {months[date.getMonth()]}
                </div>
              )}

              {/* Event Dots on the timeline track */}
              {events.filter(e => e.date === date.toISOString().split('T')[0]).map((e, index) => {
                const flagUrl = e.countryCode && e.countryCode !== 'GLOBAL'
                  ? `https://flagcdn.com/w20/${e.countryCode.toLowerCase()}.png`
                  : null;

                return (
                    <div
                      key={e.id}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setCurrentDate(e.date);
                        if (e.countryCode && e.countryCode !== 'GLOBAL') {
                          const country = useStore.getState().countries.find(c => c.code === e.countryCode);
                          if (country) useStore.getState().setSelectedCountry(country);
                        }
                      }}
                      className="absolute bottom-14 flex flex-col items-center group transition-all duration-200 hover:!z-[100] cursor-pointer"
                      style={{
                        bottom: `${3.5 + (index * 6)}rem`, // Stagger height if multiple events on same day
                        zIndex: 10 + index
                      }}
                    >
                    {/* Connector Line */}
                    <div className={`w-px h-6 mb-1 ${e.type === 'THREAT' ? 'bg-orange-500' :
                        e.type === 'IMPOSITION' ? 'bg-red-500' :
                          e.type === 'RELIEF' ? 'bg-green-500' : 'bg-blue-400'
                      }`} />

                    {/* Event Card */}
                    <div className={`
                      flex flex-col items-start p-2 rounded-md shadow-lg backdrop-blur-md border min-w-[120px] max-w-[160px]
                      transition-all duration-200 hover:scale-110 hover:z-[100]
                      ${e.type === 'THREAT' ? 'bg-orange-950/80 border-orange-500/50' :
                        e.type === 'IMPOSITION' ? 'bg-red-950/80 border-red-500/50' :
                          e.type === 'RELIEF' ? 'bg-green-950/80 border-green-500/50' : 'bg-blue-950/80 border-blue-500/50'
                      }
                    `}>
                      <div className="flex items-center gap-2 mb-1 w-full border-b border-white/10 pb-1">
                        {flagUrl && <img src={flagUrl} alt={e.countryCode} className="w-4 h-auto rounded-[1px]" />}
                        <span className="text-[10px] font-mono text-slate-300">{e.date}</span>
                      </div>
                      <div className="text-[10px] font-semibold text-white leading-tight line-clamp-2">
                        {e.headline}
                      </div>
                    </div>

                    {/* Dot on line */}
                    <div
                      className={`absolute -bottom-7 w-2 h-2 rounded-full ${e.type === 'THREAT' ? 'bg-orange-500' :
                          e.type === 'IMPOSITION' ? 'bg-red-500' :
                            e.type === 'RELIEF' ? 'bg-green-500' : 'bg-blue-400'
                        }`}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </motion.div>

      {/* Gradient Masks for fade out effect on sides */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-20" />

    </div>
  );
};

export default Timeline;
