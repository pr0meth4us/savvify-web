import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Savvify',
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
      <div className="mb-10 border-b border-slate-100 pb-10">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-4">
          Effective Date: December 2025
        </span>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Please read these terms carefully before using Savvify.
        </p>
      </div>

      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing or using the Savvify Telegram Bot or Web Dashboard ("Services"), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Services.
      </p>

      <h3>2. Accounts</h3>
      <p>
        When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
      </p>

      <h3>3. Subscriptions</h3>
      <p>
        Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
      </p>

      <h3>4. Termination</h3>
      <p>
        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        In no event shall Savvify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.
      </p>

      <h3>6. Changes</h3>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>

      <h3>7. Contact Us</h3>
      <p>
        If you have any questions about these Terms, please contact us at <a href="mailto:support@savvify.com">support@savvify.com</a>.
      </p>
    </article>
  );
}