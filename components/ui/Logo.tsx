// components/ui/Logo.tsx
import React from 'react';

export function Logo({ className = "w-8 h-8", textClassName = "text-xl" }: { className?: string, textClassName?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`text-indigo-600 flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Bottom Bar */}
          <rect x="4" y="20" width="8" height="8" rx="2" fill="currentColor" fillOpacity="0.4" />
          {/* Middle Bar */}
          <rect x="12" y="12" width="8" height="16" rx="2" fill="currentColor" fillOpacity="0.7" />
          {/* Top Bar - The Growth */}
          <rect x="20" y="4" width="8" height="24" rx="2" fill="currentColor" />
        </svg>
      </div>
      <span className={`font-bold tracking-tight text-slate-900 ${textClassName}`}>
        Savvify
      </span>
    </div>
  );
}