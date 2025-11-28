import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Savvify - Personal Finance Tracking',
  description: 'Track expenses, manage debts, and gain financial clarity.',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
    <body className="h-full antialiased font-sans bg-slate-50 text-slate-900">
    <AuthProvider>{children}</AuthProvider>
    </body>
    </html>
  );
}