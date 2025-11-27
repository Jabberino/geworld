'use client';

import { useStore } from '../store/useStore';
import { BookOpen } from 'lucide-react';

const ReferencesButton = () => {
    const { setShowReferences } = useStore();

    return (
        <button
            onClick={() => setShowReferences(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 hover:text-white transition-all backdrop-blur-sm"
        >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">References</span>
        </button>
    );
};

export default ReferencesButton;
