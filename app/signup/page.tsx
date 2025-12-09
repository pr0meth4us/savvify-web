import React from 'react';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Savvify',
  description: 'Create your financial tracking account.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <div className="bg-indigo-600 text-white rounded-xl p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28 0a.75.75 0 01.22-.53l2.25-2.25a.75.75 0 111.06 1.06L8.56 12l1.72 1.72a.75.75 0 11-1.06 1.06l-2.25-2.25a.75.75 0 01-.22-.53z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Start your 30-day free trial. No credit card required.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          {/* We reuse LoginForm because Bifrost uses 'find_or_create' logic.
              Ideally, you'd pass a prop to LoginForm to change button text to 'Sign Up',
              but for now, standard login works as registration. */}
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in instead
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}