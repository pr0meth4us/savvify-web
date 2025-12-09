import React from 'react';
import { Metadata } from 'next';
import { Scale, AlertTriangle, Copyright, ScrollText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Savvify',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-slate-600">
          Effective Date: December 2025
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Please read these terms carefully before using the Savvify Telegram Bot or Web Dashboard.
        </p>
      </div>

      <div className="space-y-12">

        {/* 1. Agreement */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ScrollText className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p>
              By accessing or using Savvify ("The Service"), you agree to be bound by these Terms.
              The Service is provided by an independent developer ("The Provider"). If you disagree with any part of the terms, you may not access the Service.
            </p>
          </div>
        </section>

        {/* 2. No Financial Advice (Crucial for liability) */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">2. Not Financial Advice</h3>
            <p>
              <strong>Savvify is a data logging and visualization tool only.</strong>
            </p>
            <p>
              The Service does not provide financial, investment, tax, or legal advice. The Provider is not a financial institution or fiduciary.
              Calculations, reports, and debt tracking features are provided for informational purposes and rely entirely on user input.
              You are solely responsible for your financial decisions.
            </p>
          </div>
        </section>

        {/* 3. Liability */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <Scale className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">3. Limitation of Liability</h3>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Provider makes no representations or warranties of any kind,
              express or implied, regarding the uptime, accuracy, or reliability of the Service.
            </p>
            <p>
              To the maximum extent permitted by applicable law, The Provider shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
              resulting from your access to or use of the Service.
            </p>
          </div>
        </section>

        {/* 4. Governing Law */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <Copyright className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">4. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the <strong>Kingdom of Cambodia</strong>, without regard to its conflict of law provisions.
            </p>
            <p>
              Failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </div>
        </section>

        {/* 5. Subscriptions */}
        <section className="prose prose-slate max-w-none ml-0 sm:ml-[72px]">
          <h3 className="text-xl font-bold text-slate-900">5. Subscriptions & Termination</h3>
          <p>
            Some parts of the Service are billed on a subscription basis. You may cancel your subscription at any time.
            The Provider reserves the right to terminate or suspend access to the Service immediately, without prior notice,
            for any reason, including without limitation if you breach the Terms.
          </p>
        </section>

        {/* Contact Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8">
          <p className="text-slate-600">
            If you have any questions about these Terms, please contact:
          </p>
          <div className="mt-2 flex gap-4">
            <a href="mailto:helmthehelm@outlook.com" className="text-indigo-600 font-semibold hover:underline">
              helmthehelm@outlook.com
            </a>
            <a href="https://pr0meth4us.github.io/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600">
              Developer Profile
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}