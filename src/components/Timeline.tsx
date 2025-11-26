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
  const { currentDate, setCurrentDate, events, isPlaying, setIsPlaying } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Sync x with global currentDate
  useEffect(() => {
    if (isDragging) return;

    const current = new Date(currentDate).getTime();
    const daysSinceStart = (current - START_DATE) / (1000 * 60 * 60 * 24);
    const targetX = -daysSinceStart * PIXELS_PER_DAY;
    
    // Animate to position if playing, otherwise jump
    if (isPlaying) {
        animate(x, targetX, { duration: 1, ease: "linear" });
    } else {
        x.set(targetX);
    }
  }, [currentDate, isDragging, isPlaying, x]);

  // Auto-play loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const current = new Date(currentDate).getTime();
        const next = current + (1000 * 60 * 60 * 24); // +1 day per tick
        if (next > END_DATE) {
            setIsPlaying(false);
        } else {
            setCurrentDate(new Date(next).toISOString().split('T')[0]);
        }
      }, 50); // Fast ticks for smooth play
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentDate, setCurrentDate, setIsPlaying]);

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
      <div className="absolute top-4 right-8 z-50">
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
        dragMomentum={true}
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
                    {events.filter(e => e.date === date.toISOString().split('T')[0]).map(e => (
                        <div 
                            key={e.id}
                            className={`absolute bottom-14 w-3 h-3 rounded-full border border-slate-900 ${
                                e.type === 'THREAT' ? 'bg-orange-500' :
                                e.type === 'IMPOSITION' ? 'bg-red-500' :
                                e.type === 'RELIEF' ? 'bg-green-500' : 'bg-blue-400'
                            }`}
                            title={e.headline}
                        />
                    ))}
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
