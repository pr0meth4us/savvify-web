import React from 'react';
import { Metadata } from 'next';
import { Shield, Eye, Lock, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Savvify',
};

export default function PrivacyPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-slate-100 pb-10">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
          Last Updated: December 2025
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Your finance data is yours. We don't sell it, we don't view it, and we protect it.
        </p>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <PrivacyCard
          icon={Shield}
          title="Zero-Access Guarantee"
          description="Our employees strictly do not access your specific transaction logs or debt records unless legally compelled."
        />
        <PrivacyCard
          icon={Eye}
          title="No Ad Tracking"
          description="We do not sell your data to advertisers. Our business model is simple: you pay us, we provide a tool."
        />
        <PrivacyCard
          icon={Lock}
          title="Encryption"
          description="All data is encrypted in transit (TLS 1.3) and at rest in our secure database infrastructure."
        />
        <PrivacyCard
          icon={Server}
          title="Data Minimization"
          description="We only store what is strictly necessary to run the app (Telegram ID, transaction amounts, and category tags)."
        />
      </div>

      {/* Detailed Prose */}
      <article className="prose prose-slate prose-lg max-w-none text-slate-600">
        <h3 className="text-slate-900">1. Information We Collect</h3>
        <p>To provide our services, we collect:</p>
        <ul className="marker:text-indigo-500">
          <li><strong>Identity Data:</strong> Your Telegram User ID and Display Name (publicly available via Telegram) and your Email (if you set a password).</li>
          <li><strong>Financial Data:</strong> The inputs you send to the bot (e.g., "Lunch $5"). We parse this to create structured records.</li>
          <li><strong>Metadata:</strong> Technical logs (IP address, browser type) to prevent abuse and debug crashes.</li>
        </ul>

        <h3 className="text-slate-900">2. How We Use Your Data</h3>
        <p>We use your data solely to:</p>
        <ul className="marker:text-indigo-500">
          <li>Process your natural language inputs into transaction records.</li>
          <li>Generate your financial reports and charts.</li>
          <li>Send you daily reminders (only if you opt-in).</li>
        </ul>

        <h3 className="text-slate-900">3. Third-Party Services</h3>
        <p>We use trusted infrastructure providers to run Savvify:</p>
        <ul className="marker:text-indigo-500">
          <li><strong>Vercel & Koyeb:</strong> For hosting our web dashboard and backend API.</li>
          <li><strong>MongoDB Atlas:</strong> For secure, encrypted database storage.</li>
          <li><strong>Telegram:</strong> As the primary interface for inputting data.</li>
        </ul>

        <h3 className="text-slate-900">4. Your Rights</h3>
        <p>
          You have the right to <strong>export</strong> your data (via CSV) or <strong>delete</strong> your account entirely at any time via the Settings page. Upon deletion, all your financial records are permanently purged from our active database.
        </p>

        <h3 className="text-slate-900">5. Contact</h3>
        <p>
          Questions about privacy? Email our Data Protection Officer at <a href="mailto:privacy@savvify.com" className="text-indigo-600 no-underline hover:underline">privacy@savvify.com</a>.
        </p>
      </article>
    </div>
  );
}

function PrivacyCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}