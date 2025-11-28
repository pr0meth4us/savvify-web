import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading..."
    >
      <div
        className={cn(
          'h-full w-full rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin',
        )}
      ></div>
    </div>
  );
}