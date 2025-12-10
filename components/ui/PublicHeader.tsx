// components/ui/PublicHeader.tsx
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from './Button';
import { Logo } from './Logo';

export function PublicHeader() {
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-indigo-600" textClassName="text-2xl" />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Pricing
          </Link>
          <Link
            href="/trust"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Trust
          </Link>
        </nav>

        {/* Dynamic Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button variant="primary" asChild>
              <Link href="/dashboard">Go to Dashboard &rarr;</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="primary" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}