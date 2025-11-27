'use client';

import { useEffect, useState } from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobileDevice = width < 768; // Tailwind md breakpoint
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icons */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <Smartphone className="w-16 h-16 text-slate-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <X className="w-10 h-10 text-red-500 stroke-[3]" />
            </div>
          </div>
          <div className="w-12 h-0.5 bg-slate-700" />
          <Monitor className="w-16 h-16 text-blue-400" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">
            Desktop Only
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            TradePulse is optimized for desktop viewing only. Please access this application from a desktop or laptop computer for the best experience.
          </p>
        </div>

        {/* Branding */}
        <div className="pt-8 border-t border-slate-800">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            TRADEPULSE
          </div>
          <p className="text-sm text-slate-500 mt-2">Global Economic Monitor</p>
        </div>
      </div>
    </div>
  );
};

export default MobileBlocker;
