import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * A Helm-branded "Compass" spinner.
 * It evokes navigation and finding one's bearing.
 */
export function Spinner({ className, size = 'md' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const needleSize = {
        sm: 'border-b-[6px] border-l-[3px] border-r-[3px]',
        md: 'border-b-[12px] border-l-[6px] border-r-[6px]',
        lg: 'border-b-[18px] border-l-[9px] border-r-[9px]',
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
            {/* Outer spinning ring */}
            <div
                className={cn(
                    'absolute h-full w-full rounded-full border-2 border-helm-fog-dark border-t-helm-ocean animate-spin',
                )}
            ></div>
            {/* Inner compass needle (points up) */}
            <div
                className={cn(
                    'w-0 h-0 border-l-transparent border-r-transparent border-b-helm-navy',
                    needleSize[size],
                )}
            ></div>
        </div>
    );
}