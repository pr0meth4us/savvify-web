import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        const inputId = props.id || React.useId();
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-helm-ocean mb-1"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-helm-fog-dark bg-white px-3 py-2 text-sm text-helm-navy ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-helm-ocean/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-helm-ocean focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };