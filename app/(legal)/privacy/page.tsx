import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Helm',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lead">Last Updated: November 2025</p>

      <p>
        At Helm ("we", "our", or "us"), we provide the Savvify financial tracking service via Telegram and our web dashboard. This Privacy Policy explains how we collect, use, and protect your information. We steer by a simple star: <strong>Your data is yours.</strong>
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect only the information necessary to help you navigate your finances:</p>
      <ul>
        <li><strong>Identity Data:</strong> Telegram User ID, display name, and (if provided) email address and password.</li>
        <li><strong>Financial Data:</strong> Transaction details (amounts, currencies, categories, descriptions) and debt records (IOUs) you explicitly log into the system.</li>
        <li><strong>Usage Data:</strong> Logs of how you interact with our bot and dashboard to help us improve stability and security.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We process your data to:</p>
      <ul>
        <li>Provide the Savvify budgeting service and visualize your financial course.</li>
        <li>Sync your data between the Telegram Bot and Web Dashboard.</li>
        <li>Send you requested alerts (e.g., daily reminders).</li>
        <li>Detect and prevent fraud or abuse of our systems.</li>
      </ul>

      <h2>3. The Zero-Access Guarantee</h2>
      <p>
        We have a strict internal policy regarding your Financial Data. Our employees do not access your specific transaction or debt logs unless:
      </p>
      <ul>
        <li>You explicitly grant us permission to resolve a specific support ticket.</li>
        <li>We are compelled by a valid legal order.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>

      <h2>4. Data Storage & Security</h2>
      <p>
        Your data is stored in secure databases protected by industry-standard encryption. Passwords are hashed using bcrypt. Data in transit is encrypted via TLS. While we strive to protect your data, no digital storage is impenetrable, and we encourage you to use strong passwords.
      </p>

      <h2>5. Your Rights</h2>
      <p>Under applicable laws (such as GDPR), you have the right to:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of all data we hold about you.</li>
        <li><strong>Rectification:</strong> Correct inaccurate data directly via the dashboard.</li>
        <li><strong>Erasure:</strong> Request deletion of your account and all associated data.</li>
        <li><strong>Portability:</strong> Export your transaction history via the Settings page.</li>
      </ul>

      <h2>6. Contact Us</h2>
      <p>
        If you have questions about your privacy, please contact the Helm Navigator at privacy@helm-digital.com.
      </p>
    </>
  );
}