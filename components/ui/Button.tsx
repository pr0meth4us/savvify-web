'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

// Base styles for all buttons
const baseStyles =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium font-display tracking-wide transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-helm-horizon focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

// Variant styles
const variantStyles = {
    primary:
        'bg-helm-navy text-white hover:bg-helm-navy-light shadow-sm',
    secondary:
        'bg-helm-ocean text-white hover:bg-helm-ocean/90',
    accent:
        'bg-helm-seafoam text-helm-navy hover:bg-helm-seafoam/90',
    outline:
        'border border-helm-fog-dark bg-white text-helm-navy hover:bg-helm-fog',
    ghost:
        'bg-transparent text-helm-navy hover:bg-helm-fog',
    danger:
        'bg-red-600 text-white hover:bg-red-700',
};

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variantStyles;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', children, isLoading, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(baseStyles, variantStyles[variant], className)}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Spinner size="sm" className="text-white" />
                        <span>Steering...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button };