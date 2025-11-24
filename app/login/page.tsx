import React from 'react';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Savvify by Helm',
  description: 'Access your financial compass.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-helm-fog">
      {/* Left: Navigation/Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-helm-navy relative overflow-hidden items-center justify-center text-white p-12">
        {/* Abstract Navigation Graphics */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 text-helm-seafoam">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-6">
            Steer toward financial clarity.
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Log in to Savvify to access your detailed financial charts, manage debts, and configure your personal navigation settings.
          </p>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-helm-navy font-display tracking-tight">
                Helm
              </span>
              <span className="ml-2 text-sm font-medium text-helm-ocean uppercase tracking-widest border-l border-helm-fog-dark pl-2">
                Savvify
              </span>
            </Link>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-helm-navy font-display">
              Access your compass
            </h2>
            <p className="mt-2 text-sm leading-6 text-helm-ocean">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-helm-navy hover:text-helm-ocean underline decoration-helm-seafoam underline-offset-4">
                Start navigating today
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <LoginForm />
          </div>

          <div className="mt-10 text-center text-xs text-helm-ocean/60">
            <p>&copy; {new Date().getFullYear()} Helm Digital Co.</p>
          </div>
        </div>
      </div>
    </div>
  );
}