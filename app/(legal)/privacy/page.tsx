import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Globe, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Savvify',
  description: 'How Savvify collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-600">
          Last Updated: December 2025
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Savvify is an independently developed service. This policy outlines how your data is handled with transparency and security as the primary goals.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">

        {/* Section 1 */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">1. Information Collection</h3>
            <p>
              To function effectively as a finance tracker, Savvify collects specific data points.
              Data collection is limited strictly to what is required for the Service to operate:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Identity Data:</strong> Telegram User ID, display name, and (if provided via the web dashboard) email address for authentication.</li>
              <li><strong>Financial Data:</strong> Transaction records, amounts, categories, currencies, and debt records (IOUs) explicitly entered by the user.</li>
              <li><strong>Usage Logs:</strong> Technical logs regarding bot interaction to assist with debugging and stability.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">2. Usage of Information</h3>
            <p>
              Data is processed solely for the purpose of providing personal financial analytics.
              <strong>Savvify does not sell, rent, or trade user data to third parties.</strong>
            </p>
            <p>
              Information is used to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Sync financial records between the Telegram interface and Web Dashboard.</li>
              <li>Generate spending reports and financial summaries requested by the user.</li>
              <li>Authenticate access to the account.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Server className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">3. Data Storage & Jurisdiction</h3>
            <p>
              Data is stored on secure, encrypted database clusters. While the Service is operated from the <strong>Kingdom of Cambodia</strong>,
              digital infrastructure may utilize international servers (e.g., AWS, MongoDB Atlas) to ensure uptime and speed.
            </p>
            <p>
              By using the Service, users consent to the transfer and storage of their data on these secure international servers.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="flex gap-4 sm:gap-8">
          <div className="hidden sm:block mt-1">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Lock className="h-5 w-5" />
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900">4. User Rights & Control</h3>
            <p>
              In alignment with international standards (such as GDPR principles) and Cambodian consumer protection laws, users retain full ownership of their financial logs.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Right to Access:</strong> You may view all your logged data via the dashboard at any time.</li>
              <li><strong>Right to Erasure:</strong> You may request the complete deletion of your account and all associated records.</li>
              <li><strong>Right to Export:</strong> You may export your transaction history via the CSV export tools provided.</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <div className="mt-16 rounded-2xl bg-slate-50 p-8 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Protection Inquiries</h3>
          <p className="text-slate-600 mb-4">
            For any concerns regarding your data privacy or to exercise your rights, please contact the developer directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a href="mailto:helmthehelm@outlook.com" className="text-indigo-600 font-medium hover:underline">
              helmthehelm@outlook.com
            </a>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a href="https://pr0meth4us.github.io/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors">
              Developer Profile &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}