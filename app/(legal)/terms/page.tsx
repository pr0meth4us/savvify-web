import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Savvify',
};

export default function TermsPage() {
  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-10">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
          Effective Date: December 1, 2025
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Terms of Service
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          The rules of the road. By using Savvify, you agree to these terms.
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-indigo-600">

        <h3>1. The Service</h3>
        <p>
          Savvify ("we", "us") provides a financial tracking tool accessible via Telegram and a Web Dashboard.
          We are not a bank, financial advisor, or accountant. The data presented is for informational purposes only.
        </p>

        <h3>2. Accounts</h3>
        <p>
          You are responsible for maintaining the security of your account (including your Telegram account and web password).
          We are not liable for any loss or damage from your failure to comply with this security obligation.
        </p>

        <h3>3. Subscriptions & Payments</h3>
        <ul>
          <li><strong>Billing:</strong> Subscriptions are billed in advance on a monthly or yearly basis.</li>
          <li><strong>Changes:</strong> We reserve the right to change our pricing, but we will provide 30 days notice before any price increase affects existing subscribers.</li>
          <li><strong>Cancellation:</strong> You may cancel at any time. Access continues until the end of your current billing period.</li>
        </ul>

        <h3>4. Acceptable Use</h3>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Upload any data that is illegal or infringes on intellectual property.</li>
          <li>Attempt to reverse engineer or disrupt our API infrastructure.</li>
          <li>Use the bot for automated spam or abuse.</li>
        </ul>

        <h3>5. Termination</h3>
        <p>
          We may suspend or terminate your account if you violate these Terms.
          In most cases, we will try to provide notice and an opportunity to export your data, unless the violation is severe (e.g., fraud).
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>
          Savvify is provided "as is". We are not liable for any indirect damages, including loss of data or profits, arising from your use of the service.
          Our total liability to you shall not exceed the amount you paid us in the last 12 months.
        </p>

        <h3>7. Governing Law</h3>
        <p>
          These terms are governed by the laws of the jurisdiction in which Savvify operates, without regard to its conflict of law provisions.
        </p>

        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 not-prose">
          <h4 className="font-bold text-slate-900 mb-2">Questions?</h4>
          <p className="text-slate-600 mb-0">
            Contact us at <a href="mailto:legal@savvify.com" className="text-indigo-600 font-medium hover:underline">legal@savvify.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}