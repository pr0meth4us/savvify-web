import React from 'react';
import { Metadata } from 'next';
import { RefreshCcw, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | Savvify',
};

export default function RefundPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-100 pb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
          <CheckCircle2 className="w-3 h-3" /> 30-Day Money-Back Guarantee
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Refund Policy
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
          We want you to be happy with Savvify. If it’s not right for you, we’ll make it right.
        </p>
      </div>

      {/* Policy Content */}
      <div className="prose prose-slate prose-lg max-w-none">

        <div className="grid gap-8 md:grid-cols-2 mb-12 not-prose">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-indigo-600">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">The Guarantee</h3>
            <p className="text-slate-600">
              If you are not satisfied with Savvify for any reason within your first <strong>30 days</strong>, we will issue a full refund. No questions asked.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-rose-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">After 30 Days</h3>
            <p className="text-slate-600">
              We do not offer refunds for partial months after the initial 30-day period. You can cancel anytime to stop future billing.
            </p>
          </div>
        </div>

        <h3>How to Request a Refund</h3>
        <p>
          Simply email us from the email address associated with your account. We generally process refunds within 24-48 hours.
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@savvify.com" className="text-indigo-600 no-underline hover:underline">support@savvify.com</a></li>
          <li><strong>Subject:</strong> Refund Request</li>
        </ul>

        <h3>Cancellation vs. Refund</h3>
        <p>
          You can <strong>cancel</strong> your subscription at any time inside the app settings. This stops the auto-renewal.
          If you cancel inside the app, you will continue to have access until the end of your billing cycle.
          A <strong>refund</strong> request removes your access immediately and returns your money.
        </p>

        <h3>Processing Time</h3>
        <p>
          Once initiated, the refund usually takes <strong>5-10 business days</strong> to appear on your bank statement, depending on your financial institution.
        </p>
      </div>
    </div>
  );
}