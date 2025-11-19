import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-lg border border-helm-fog-dark bg-white shadow-sm',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// Optional: Card sub-components for standardized padding
export function CardHeader({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-4 sm:p-6', className)}
            {...props}
        />
    );
}

export function CardTitle({
                              className,
                              ...props
                          }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'font-display text-lg font-semibold leading-none tracking-tight text-helm-navy',
                className,
            )}
            {...props}
        />
    );
}

export function CardDescription({
                                    className,
                                    ...props
                                }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-sm text-helm-ocean', className)}
            {...props}
        />
    );
}

export function CardContent({
                                className,
                                ...props
                            }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-4 sm:p-6 pt-0', className)} {...props} />;
}

export function CardFooter({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex items-center p-4 sm:p-6 pt-0', className)}
            {...props}
        />
    );
}