'use client';

import Link from 'next/link';
import { Button } from './Button';

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-helm-fog-dark bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-helm-navy font-display">
            Helm
          </span>
                    <span className="mt-1 hidden text-sm font-medium text-helm-ocean sm:block">
            / Savvify
          </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/#features"
                        className="text-sm font-medium text-helm-ocean transition-colors hover:text-helm-navy"
                    >
                        Features
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-helm-ocean transition-colors hover:text-helm-navy"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/trust"
                        className="text-sm font-medium text-helm-ocean transition-colors hover:text-helm-navy"
                    >
                        Trust
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button variant="primary" asChild>
                        <Link href="/signup">Take the Helm</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}