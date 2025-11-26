'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Globe, TrendingUp, AlertTriangle } from 'lucide-react';

const IntroModal = () => {
    const { showIntro, setShowIntro } = useStore();

    return (
        <AnimatePresence>
            {showIntro && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setShowIntro(false)}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome to GEWORLD</h1>
                            <p className="text-blue-100">Trump Trade Impact Visualizer (2025)</p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6 text-slate-300">
                            <p className="text-lg leading-relaxed">
                                Explore the potential economic and geopolitical impacts of the new administration's trade policies on the ASEAN region.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                    <Globe className="w-8 h-8 text-blue-400 mb-3" />
                                    <h3 className="font-semibold text-white mb-1">Interactive Globe</h3>
                                    <p className="text-sm text-slate-400">Navigate the 3D globe to see regional impacts.</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                    <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                                    <h3 className="font-semibold text-white mb-1">Economic Data</h3>
                                    <p className="text-sm text-slate-400">Track currency rates and export shifts.</p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                    <AlertTriangle className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="font-semibold text-white mb-1">Event Timeline</h3>
                                    <p className="text-sm text-slate-400">Follow key events and policy announcements.</p>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20 flex gap-3 items-start">
                                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm">
                                    <span className="text-blue-400 font-semibold">Tip:</span> Click on countries to view detailed analytics. Use the timeline at the bottom to travel through 2025.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-center">
                            <button
                                onClick={() => setShowIntro(false)}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default IntroModal;
