'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const CountryPanel = () => {
  const { selectedCountry, setSelectedCountry, currentDate, setCurrentDate } = useStore();

  if (!selectedCountry) return null;

  // Filter metrics up to current date for "Ghost Trail" effect
  const currentMetrics = selectedCountry.metrics.filter((m: any) => m.date <= currentDate.substring(0, 7));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 right-0 w-[400px] h-full bg-slate-900/60 backdrop-blur-xl border-l border-white/10 p-6 z-20 overflow-y-auto text-slate-100 shadow-2xl"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-5xl mb-4 drop-shadow-lg">{selectedCountry.flag}</div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {selectedCountry.name}
            </h2>
            <p className="text-blue-400 font-mono mt-1 text-sm tracking-widest uppercase">
              {selectedCountry.leader}
            </p>
          </div>
          <button
            onClick={() => setSelectedCountry(null)}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-xl">
              <div className="text-sm text-slate-400">Trump Sensitivity</div>
              <div className={`text-2xl font-bold ${selectedCountry.trumpSensitivityScore > 7 ? 'text-red-400' : 'text-blue-400'}`}>
                {selectedCountry.trumpSensitivityScore}/10
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl">
              <div className="text-sm text-slate-400">US Trade Deficit</div>
              <div className="text-2xl font-bold text-orange-400">
                {selectedCountry.usTradeDeficit}%
              </div>
            </div>
          </div>

          {/* Trump Narrative */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Trump Narrative</h3>
            <div className="space-y-3">
              {selectedCountry.events.map((event: any) => (
                <div
                  key={event.id}
                  onClick={() => setCurrentDate(event.date)}
                  className="bg-slate-800/30 p-3 rounded-lg border border-slate-700 hover:bg-slate-800/60 hover:border-blue-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span className="group-hover:text-blue-400 transition-colors">{event.date}</span>
                    <span className={
                      event.type === 'THREAT' ? 'text-orange-400' :
                        event.type === 'IMPOSITION' ? 'text-red-400' :
                          event.type === 'RELIEF' ? 'text-green-400' : 'text-blue-400'
                    }>{event.type}</span>
                  </div>
                  <div className="font-medium group-hover:text-white transition-colors">{event.headline}</div>
                  <div className="text-sm text-slate-400 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Currency Spot Rate</h3>
            <div className="h-48 bg-slate-800/30 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentMetrics}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spotRate"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false} // Important for smooth scrubbing
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Export Share</h3>
            <div className="h-48 bg-slate-800/30 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentMetrics}>
                  <defs>
                    <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="exportShare"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorExport)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryPanel;
