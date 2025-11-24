'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';
import { Slot } from '@radix-ui/react-slot'; // You might need to install this: npm install @radix-ui/react-slot

// Variant styles
const variantStyles = {
  primary: 'bg-helm-navy text-white hover:bg-helm-navy-light shadow-sm',
  secondary: 'bg-helm-ocean text-white hover:bg-helm-ocean/90',
  accent: 'bg-helm-seafoam text-helm-navy hover:bg-helm-seafoam/90',
  outline: 'border border-helm-fog-dark bg-white text-helm-navy hover:bg-helm-fog',
  ghost: 'bg-transparent text-helm-navy hover:bg-helm-fog',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-8 text-lg',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles; // Added size prop
  asChild?: boolean; // Added asChild prop
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, isLoading, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium font-display tracking-wide transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-helm-horizon focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
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
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button };