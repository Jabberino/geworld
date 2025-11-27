'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, BarChart, Bar, CartesianGrid, Cell } from 'recharts';
import { useEffect } from 'react';

const CountryPanel = () => {
  const { selectedCountry, setSelectedCountry, currentDate, setCurrentDate, events } = useStore();

  // 1. Hooks must be called unconditionally
  // Filter metrics up to current date for "Ghost Trail" effect
  const currentMetrics = selectedCountry 
    ? selectedCountry.metrics.filter((m: any) => m.date <= currentDate.substring(0, 7))
    : [];

  // Get all events for this country, sorted by date (OLDEST first - Chronological)
  // This makes "Down" button go to the NEXT (Future) story.
  const allCountryEvents = selectedCountry
    ? events
        .filter((e: any) => e.countryCode === selectedCountry.code)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  // Find the index of the "active" event (closest to current date)
  const currentTimestamp = new Date(currentDate).getTime();
  
  let activeIndex = -1;
  let minDiff = Infinity;

  allCountryEvents.forEach((e: any, i: number) => {
    const diff = Math.abs(new Date(e.date).getTime() - currentTimestamp);
    if (diff < minDiff) {
      minDiff = diff;
      activeIndex = i;
    }
  });

  // If no events, default to 0
  if (activeIndex === -1 && allCountryEvents.length > 0) activeIndex = 0;
  
  if (!selectedCountry) return null;

  // Helper to jump
  const jumpToEvent = (index: number) => {
    if (index >= 0 && index < allCountryEvents.length) {
      setCurrentDate(allCountryEvents[index].date);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 right-0 w-[400px] h-full bg-slate-900/60 backdrop-blur-xl border-l border-white/10 text-slate-100 shadow-2xl"
        style={{ zIndex: 2000 }}
      >
        {/* Fixed Close Button */}
        <button
          onClick={() => setSelectedCountry(null)}
          className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors z-10 bg-slate-900/80 backdrop-blur"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto p-6">
          <div className="mb-6 pr-12">
            <div className="text-5xl mb-4 drop-shadow-lg">{selectedCountry.flag}</div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {selectedCountry.name}
            </h2>
            <p className="text-blue-400 font-mono mt-1 text-sm tracking-widest uppercase">
              {selectedCountry.leader}
            </p>
          </div>

        <div className="space-y-6">
          {/* Key Stats Removed - Replaced by Analysis below */}

          {/* Trump Narrative (Carousel) */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Trump Narrative</h3>
            <div className="relative flex flex-col items-center gap-2 py-4 bg-slate-900/30 rounded-xl border border-white/5">
                
                {/* UP BUTTON (Previous/Past) */}
                <button 
                    onClick={() => jumpToEvent(activeIndex - 1)}
                    disabled={activeIndex <= 0}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                </button>

                {/* CAROUSEL ITEMS */}
                <div className="w-full px-4 space-y-2">
                    {/* Previous (Past) Item - Peek */}
                    {activeIndex > 0 && (
                        <div 
                            onClick={() => jumpToEvent(activeIndex - 1)}
                            className="opacity-40 scale-95 blur-[1px] cursor-pointer hover:opacity-60 transition-all"
                        >
                             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                <div className="text-xs text-slate-500 mb-1">{allCountryEvents[activeIndex - 1].date}</div>
                                <div className="font-medium text-slate-400 truncate">{allCountryEvents[activeIndex - 1].headline}</div>
                             </div>
                        </div>
                    )}

                    {/* ACTIVE ITEM */}
                    {activeIndex >= 0 && (
                        <motion.div 
                            layoutId="activeCard"
                            className="relative z-10"
                        >
                             <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500 shadow-lg shadow-blue-500/20">
                                <div className="absolute -top-3 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                                    CURRENT
                                </div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-mono text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded">
                                        {allCountryEvents[activeIndex].date}
                                    </span>
                                    <span className={
                                        allCountryEvents[activeIndex].type === 'THREAT' ? 'text-orange-400' :
                                        allCountryEvents[activeIndex].type === 'IMPOSITION' ? 'text-red-400' :
                                        allCountryEvents[activeIndex].type === 'RELIEF' ? 'text-green-400' : 'text-blue-400'
                                    }>{allCountryEvents[activeIndex].type}</span>
                                </div>
                                <div className="text-lg font-bold text-white mb-2 leading-tight">
                                    {allCountryEvents[activeIndex].headline}
                                </div>
                                <div className="text-sm text-slate-300 leading-relaxed">
                                    {allCountryEvents[activeIndex].description}
                                </div>
                             </div>
                        </motion.div>
                    )}

                    {/* Next (Future) Item - Peek */}
                    {activeIndex < allCountryEvents.length - 1 && (
                        <div 
                            onClick={() => jumpToEvent(activeIndex + 1)}
                            className="opacity-40 scale-95 blur-[1px] cursor-pointer hover:opacity-60 transition-all"
                        >
                             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                <div className="text-xs text-slate-500 mb-1">{allCountryEvents[activeIndex + 1].date}</div>
                                <div className="font-medium text-slate-400 truncate">{allCountryEvents[activeIndex + 1].headline}</div>
                             </div>
                        </div>
                    )}
                </div>

                {/* DOWN BUTTON (Next/Future) */}
                <button 
                    onClick={() => jumpToEvent(activeIndex + 1)}
                    disabled={activeIndex >= allCountryEvents.length - 1}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>

            </div>
          </div>

          {/* Spot Rate Graph */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Spot Rate (vs USD)</h3>
            <div className="h-48 bg-slate-800/30 rounded-xl p-2 relative">
              {selectedCountry.metrics.some((m: any) => m.spotRate !== null) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedCountry.metrics.filter((m: any) => m.date >= '2025-01')}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      hide 
                    />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      width={40}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94a3b8' }}
                      formatter={(value: number) => [value.toLocaleString(), 'Rate']}
                    />
                    <ReferenceLine x={currentDate.substring(0, 7)} stroke="#f59e0b" strokeWidth={3} label={{ value: 'NOW', fill: '#f59e0b', fontSize: 10, position: 'insideTopRight', fontWeight: 'bold' }} />
                    <Line
                      type="monotone"
                      dataKey="spotRate"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      connectNulls={true} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                  <span className="text-sm font-medium">No Data Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Trade Balance Graph */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Trade Balance (Billion USD)</h3>
            <div className="h-48 bg-slate-800/30 rounded-xl p-2 relative">
              {selectedCountry.metrics.some((m: any) => m.tradeBalance !== null) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedCountry.metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94a3b8' }}
                      formatter={(value: number) => [`$${value}B`, 'Balance']}
                    />
                    <ReferenceLine x={currentDate.substring(0, 7)} stroke="#f59e0b" strokeWidth={3} label={{ value: 'NOW', fill: '#f59e0b', fontSize: 10, position: 'top', fontWeight: 'bold' }} />
                    <Bar 
                      dataKey="tradeBalance" 
                      fill="#10b981"
                      radius={[2, 2, 0, 0]}
                      isAnimationActive={false}
                    >
                      {
                        selectedCountry.metrics.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.tradeBalance >= 0 ? '#10b981' : '#ef4444'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  <span className="text-sm font-medium">No Data Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Section */}
          {selectedCountry.analysis && (
            <div className="space-y-6 pt-4 border-t border-white/10">
              
              {/* Policy Response */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Policy Response</h3>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-blue-500/20">
                  <ul className="space-y-2">
                    {selectedCountry.analysis.policyResponse.map((response: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-300">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{response}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Research Analysis */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Research Analysis</h3>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-purple-500/20">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedCountry.analysis.researchAnalysis}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryPanel;
