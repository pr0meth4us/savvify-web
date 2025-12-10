// app/(public)/trust/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trust Center | Savvify',
  description: 'Security, compliance, and reliability status.',
};

export default function TrustPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Security First</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trust is our currency.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We handle your financial data with bank-grade security protocols.
            Here is how we keep your information safe and private.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Lock className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Encryption Everywhere
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your passwords are hashed using bcrypt before they ever touch our database.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Zero-Access Policy
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Our support team cannot see your transaction details or debt records unless you explicitly grant temporary access for a support ticket.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Server className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Reliable Infrastructure
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                We run on high-availability clusters with automated failover. Your data is backed up daily to a separate, secure location.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                GDPR Compliant
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                You own your data. You can export your entire transaction history or request account deletion at any time directly from your settings dashboard.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  );
}