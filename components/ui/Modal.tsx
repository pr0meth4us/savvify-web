'use client';

import React, { Fragment } from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

/**
 * A client-side modal component.
 * Control its visibility using the `isOpen` prop.
 */
export function Modal({ isOpen, onClose, children, className }: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            // Scrim / Backdrop
            className="fixed inset-0 z-50 flex items-center justify-center bg-helm-navy/80 p-4 backdrop-blur-sm animate-in fade-in"
            onClick={onClose}
        >
            <Card
                className={cn(
                    'relative z-10 w-full max-w-md animate-in fade-in zoom-in-95',
                    className,
                )}
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                {children}
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full p-1 text-helm-ocean/70 transition-colors hover:bg-helm-fog hover:text-helm-ocean"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </Card>
        </div>
    );
}