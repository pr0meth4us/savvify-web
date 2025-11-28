import React from 'react';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Savvify',
  description: 'Access your financial dashboard.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center text-white p-12">
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Financial clarity, simplified.
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Log in to Savvify to track expenses, manage debts, and view your financial analytics.
          </p>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left mb-8">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">
                Savvify
              </span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-slate-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6">
            {/* Login Form Component handles both Email and Telegram toggling */}
            <LoginForm />
          </div>

          <div className="mt-10 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Savvify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}