// app/login/page.tsx
import React from 'react';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Metadata } from 'next';
import { Logo } from '@/components/ui/Logo'; // <--- Import Logo

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
          <div className="mb-8">
            {/* Updated Large Logo for dark background */}
            <Logo className="w-16 h-16 text-blue-400" textClassName="hidden" />
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
              {/* Updated Logo for form header */}
              <Logo className="w-10 h-10 text-indigo-600" textClassName="text-3xl" />
            </Link>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-slate-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6">
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