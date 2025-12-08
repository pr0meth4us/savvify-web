import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Savvify',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
      <div className="mb-10 border-b border-slate-100 pb-10">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-4">
          Last Updated: December 2025
        </span>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          We believe you should own your financial data. Here is exactly how we handle your information.
        </p>
      </div>

      <h3>1. Information We Collect</h3>
      <p>We collect only the information necessary to provide our services:</p>
      <ul>
        <li><strong>Identity Data:</strong> Telegram User ID, display name, and (if provided) email address.</li>
        <li><strong>Financial Data:</strong> Transaction details (amounts, currencies, categories, descriptions) and debt records (IOUs) you explicitly log into the system.</li>
        <li><strong>Usage Data:</strong> Logs of how you interact with our bot and dashboard to help us improve stability and security.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>We process your data to:</p>
      <ul>
        <li>Provide the Savvify budgeting service and visualize your financial status.</li>
        <li>Sync your data between the Telegram Bot and Web Dashboard.</li>
        <li>Send you requested alerts (e.g., daily reminders).</li>
        <li>Detect and prevent fraud or abuse of our systems.</li>
      </ul>

      <h3>3. The Zero-Access Guarantee</h3>
      <p>
        We have a strict internal policy regarding your Financial Data. Our employees do not access your specific transaction or debt logs unless:
      </p>
      <ul>
        <li>You explicitly grant us permission to resolve a specific support ticket.</li>
        <li>We are compelled by a valid legal order.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>

      <h3>4. Data Storage & Security</h3>
      <p>
        Your data is stored in secure databases protected by industry-standard encryption. Data in transit is encrypted via TLS. While we strive to protect your data, no digital storage is impenetrable, and we encourage you to use strong passwords where applicable.
      </p>

      <h3>5. Your Rights</h3>
      <p>Under applicable laws, you have the right to:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of all data we hold about you.</li>
        <li><strong>Rectification:</strong> Correct inaccurate data directly via the dashboard.</li>
        <li><strong>Erasure:</strong> Request deletion of your account and all associated data.</li>
        <li><strong>Portability:</strong> Export your transaction history via the Settings page.</li>
      </ul>

      <h3>6. Contact Us</h3>
      <p>
        If you have questions about your privacy, please contact our Data Protection Officer at <a href="mailto:privacy@savvify.com">privacy@savvify.com</a>.
      </p>
    </article>
  );
}