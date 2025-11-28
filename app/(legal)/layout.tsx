import React from 'react';
import Link from 'next/link';
import { PublicFooter } from '@/components/ui/PublicFooter';

export default function LegalLayout({
                                      children,
                                    }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Simple Legal Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Savvify
            </span>
            <span className="text-sm text-slate-500 border-l border-slate-200 pl-3 ml-2">
               Legal
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-slate-200 prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 max-w-none">
            {children}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}