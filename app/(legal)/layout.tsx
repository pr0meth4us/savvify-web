import React from 'react';
import Link from 'next/link';
import { PublicFooter } from '@/components/ui/PublicFooter';

export default function LegalLayout({
                                      children,
                                    }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-helm-fog">
      <header className="border-b border-helm-fog-dark bg-white">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-helm-navy font-display">
              Helm
            </span>
            <span className="text-sm text-helm-ocean border-l border-helm-fog-dark pl-2 ml-2">
              Legal
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-helm-ocean hover:text-helm-navy transition-colors"
          >
            Return Home
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-helm-fog-dark prose prose-slate prose-headings:font-display prose-headings:text-helm-navy prose-a:text-helm-ocean hover:prose-a:text-helm-navy max-w-none">
            {children}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}