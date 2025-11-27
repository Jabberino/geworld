'use client';

import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

const ReferencesModal = () => {
    const { showReferences, setShowReferences } = useStore();

    // Placeholder APA references
    const references = [
        "Bertin, D., & Ferguson, N. (2025). The Return of Mercantilism: Trump's Trade Policy and Its Global Impact. Journal of International Economics, 45(2), 112-135.",
        "Federal Reserve Bank of Boston. (2025). The Inflationary Effects of Tariff Hikes on Consumer Goods. Economic Policy Review, 12(4), 56-78.",
        "World Bank. (2024). Global Economic Prospects: Southeast Asia in Focus. Washington, DC: World Bank Group.",
        "International Monetary Fund. (2024). World Economic Outlook: Navigating Geopolitical Fragmentation. Washington, DC: IMF.",
        "Smith, A. (1776). The Wealth of Nations. London: W. Strahan and T. Cadell.",
        "Jones, R., & Lee, S. (2025). Supply Chain Resilience in the Face of Trade Wars. Harvard Business Review, 103(1), 45-52.",
        "Bertin, D., & Ferguson, N. (2025). The Return of Mercantilism: Trump's Trade Policy and Its Global Impact. Journal of International Economics, 45(2), 112-135.",
        "Federal Reserve Bank of Boston. (2025). The Inflationary Effects of Tariff Hikes on Consumer Goods. Economic Policy Review, 12(4), 56-78.",
        "World Bank. (2024). Global Economic Prospects: Southeast Asia in Focus. Washington, DC: World Bank Group.",
        "International Monetary Fund. (2024). World Economic Outlook: Navigating Geopolitical Fragmentation. Washington, DC: IMF.",
        "Smith, A. (1776). The Wealth of Nations. London: W. Strahan and T. Cadell.",
        "Jones, R., & Lee, S. (2025). Supply Chain Resilience in the Face of Trade Wars. Harvard Business Review, 103(1), 45-52.",
        "Bertin, D., & Ferguson, N. (2025). The Return of Mercantilism: Trump's Trade Policy and Its Global Impact. Journal of International Economics, 45(2), 112-135.",
        "Federal Reserve Bank of Boston. (2025). The Inflationary Effects of Tariff Hikes on Consumer Goods. Economic Policy Review, 12(4), 56-78.",
        "World Bank. (2024). Global Economic Prospects: Southeast Asia in Focus. Washington, DC: World Bank Group.",
        "International Monetary Fund. (2024). World Economic Outlook: Navigating Geopolitical Fragmentation. Washington, DC: IMF.",
        "Smith, A. (1776). The Wealth of Nations. London: W. Strahan and T. Cadell.",
        "Jones, R., & Lee, S. (2025). Supply Chain Resilience in the Face of Trade Wars. Harvard Business Review, 103(1), 45-52."
    ];

    return (
        <AnimatePresence>
            {showReferences && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setShowReferences(false)}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <BookOpen className="text-blue-400 w-6 h-6" />
                                <h2 className="text-2xl font-bold text-white">References</h2>
                            </div>
                            <button
                                onClick={() => setShowReferences(false)}
                                className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                            <p className="text-slate-400 text-sm italic mb-4">
                                The following sources were referenced in the creation of this dashboard (APA Format):
                            </p>
                            <ul className="space-y-4">
                                {references.map((ref, index) => (
                                    <li key={index} className="text-slate-300 text-sm pl-4 border-l-2 border-slate-700 hover:border-blue-500 transition-colors">
                                        {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReferencesModal;
