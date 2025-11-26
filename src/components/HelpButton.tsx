'use client';

import { useStore } from '../store/useStore';
import { HelpCircle } from 'lucide-react';

const HelpButton = () => {
    const { setShowIntro } = useStore();

    return (
        <button
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 hover:text-white transition-all backdrop-blur-sm"
        >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Need Help?</span>
        </button>
    );
};

export default HelpButton;
