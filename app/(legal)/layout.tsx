import React from 'react';
import Link from 'next/link';
import { PublicFooter } from '@/components/ui/PublicFooter';
import { Logo } from '@/components/ui/Logo'; // Assuming you have this from the previous file

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-6" textClassName="text-lg" />
            <span className="text-sm font-medium text-slate-400">/</span>
            <span className="text-sm font-semibold text-slate-600">Legal</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Content Content */}
      <main className="flex-grow py-12 sm:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="bg-white p-8 sm:p-16 rounded-2xl shadow-sm border border-slate-200">
            {children}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}