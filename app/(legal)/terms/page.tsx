import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Helm',
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="lead">Last Updated: November 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using Savvify by Helm (via the Telegram Bot or Web Dashboard), you agree to be bound by these Terms. If you do not agree, you may not use our services.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Savvify is a personal finance navigation tool that allows users to track income, expenses, and debts via natural language input on Telegram and a visual web dashboard.
      </p>

      <h2>3. Telegram Integration</h2>
      <p>
        Our service relies on the Telegram messaging platform. By using Savvify, you acknowledge that:
      </p>
      <ul>
        <li>We do not control Telegram and are not responsible for its availability or security.</li>
        <li>Messages sent to our bot are processed by our servers to extract financial data.</li>
        <li>You are responsible for securing your Telegram account to prevent unauthorized access to your financial logs.</li>
      </ul>

      <h2>4. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials (email/password) and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
      </p>

      <h2>5. Subscriptions & Billing</h2>
      <p>
        Some features of Savvify ("Premium Navigation") require a paid subscription. By subscribing, you agree to pay the fees indicated. Payments are processed by our third-party provider, Stripe. You may cancel your subscription at any time via the Billing portal.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        Savvify is provided "as is" and "as available." While we strive for accuracy, we do not guarantee that the service will be error-free or that your financial data calculations will be perfectly accurate. Savvify is a tool for guidance, not professional financial or tax advice.
      </p>

      <h2>7. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account if you violate these Terms or use the service for illegal activities.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. Continued use of the service constitutes acceptance of the modified Terms.
      </p>
    </>
  );
}