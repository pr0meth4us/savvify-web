import React from 'react';

export function Logo({ className = "w-8 h-8", textClassName = "text-xl" }: { className?: string, textClassName?: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* Placeholder Logo Icon: Abstract 'S' or Graph */}
      <div className={`bg-primary text-white rounded-xl flex items-center justify-center font-bold ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3/5 h-3/5">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28 0a.75.75 0 01.22-.53l2.25-2.25a.75.75 0 111.06 1.06L8.56 12l1.72 1.72a.75.75 0 11-1.06 1.06l-2.25-2.25a.75.75 0 01-.22-.53z" clipRule="evenodd" />
        </svg>
      </div>
      <span className={`font-bold tracking-tight text-zinc-900 ${textClassName}`}>
        Savvify
      </span>
    </div>
  );
}