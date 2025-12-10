import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  Zap,
  Terminal,
  CreditCard,
  Smartphone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'User Guide | Savvify',
  description: 'Master your finances with our Telegram Bot commands and Web Dashboard.',
};

export default function GuidePage() {
  return (
    <div className="bg-zinc-50 min-h-screen py-12 sm:py-24">
      <div className="container mx-auto max-w-4xl px-6">

        {/* --- Header --- */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl mb-6">
            User Guide
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Savvify works best when you use the Telegram bot for quick entry and the Web Dashboard for deep analysis.
          </p>
        </div>

        {/* --- Navigation Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Smart Commands</h3>
            <p className="text-zinc-600 mb-4">
              Learn the keywords that automatically categorize your spending without clicking menus.
            </p>
            <Link href="#keywords" className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
              View Keywords <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Debt & IOUs</h3>
            <p className="text-zinc-600 mb-4">
              Track who owes you money and manage repayments with simple chat commands.
            </p>
            <Link href="#debt" className="text-emerald-600 font-medium hover:underline flex items-center gap-1">
              View Debt Commands <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="prose prose-zinc prose-lg max-w-none">

          {/* 1. Natural Language */}
          <section id="basics" className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-zinc-900 border-b border-zinc-200 pb-4">
              <Zap className="w-8 h-8 text-indigo-500" /> Natural Language Logging
            </h2>
            <p>
              The fastest way to log a transaction is to just say what you bought.
              The bot will try to detect the amount, currency, and description automatically.
            </p>
            <div className="not-prose grid gap-4 my-6">
              <CommandCard
                title="Simple Expense"
                syntax="<Item Name> <Amount>"
                examples={['Coffee 2.50', 'Taxi 15', 'Lunch 15000khr']}
                result="Logs 'Coffee' as an Expense of $2.50 (USD default)."
              />
              <CommandCard
                title="With Description"
                syntax="<Category> <Amount> <Description>"
                examples={['Taxi 5 "to airport"', 'Groceries 45 "weekly supplies"']}
                result="Logs 'Taxi' (Transport) for $5.00 with the note 'to airport'."
              />
            </div>
          </section>

          {/* 2. Quick Keywords (Based on Backend COMMAND_MAP) */}
          <section id="keywords" className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-zinc-900 border-b border-zinc-200 pb-4">
              <Terminal className="w-8 h-8 text-indigo-500" /> Quick Keywords
            </h2>
            <p>
              We have pre-configured keywords that automatically map to specific categories.
              Start your message with these words to skip selecting a category manually.
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="font-bold text-rose-600 mb-3 flex items-center gap-2">
                  📉 Expense Keywords
                </h4>
                <ul className="space-y-2 text-sm text-zinc-600 font-mono">
                  <li>coffee, lunch, dinner, pizza</li>
                  <li>gas, parking, taxi</li>
                  <li>groceries, shopping</li>
                  <li>bills, alcohol</li>
                  <li>movie, investment</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="font-bold text-emerald-600 mb-3 flex items-center gap-2">
                  📈 Income Keywords
                </h4>
                <ul className="space-y-2 text-sm text-zinc-600 font-mono">
                  <li>salary</li>
                  <li>bonus</li>
                  <li>commission</li>
                  <li>allowance</li>
                  <li>gift</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Debt Commands (Based on Backend Handlers) */}
          <section id="debt" className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-zinc-900 border-b border-zinc-200 pb-4">
              <CreditCard className="w-8 h-8 text-indigo-500" /> Debt & IOUs
            </h2>
            <p>
              Savvify keeps a running ledger for every person you interact with.
              Use these commands to track loans and repayments.
            </p>

            <div className="not-prose space-y-4 mt-6">
              <CommandCard
                title="Lending Money (They owe you)"
                syntax="Lent <Person> <Amount> [Note]"
                examples={['Lent John 50', 'Lent Sarah 100 "concert ticket"']}
                result="Creates an 'Open Debt'. John now owes you $50."
              />

              <CommandCard
                title="Borrowing Money (You owe them)"
                syntax="Borrowed <Person> <Amount> [Note]"
                examples={['Borrowed Mike 20', 'Borrowed Mom 500 "rent help"']}
                result="Creates an 'Open Debt'. You now owe Mike $20."
              />

              <CommandCard
                title="Receiving Repayment"
                syntax="Repaid by <Person> <Amount>"
                examples={['Repaid by John 50']}
                result="Reduces John's debt to you. If $0 remains, the debt is settled."
              />

              <CommandCard
                title="Paying Someone Back"
                syntax="Paid <Person> <Amount>"
                examples={['Paid Mike 20']}
                result="Reduces the amount you owe Mike."
              />
            </div>
          </section>

          {/* 4. Utility Commands */}
          <section id="utilities" className="mb-16">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-zinc-900 border-b border-zinc-200 pb-4">
              <Smartphone className="w-8 h-8 text-indigo-500" /> Utilities
            </h2>
            <ul className="not-prose grid gap-3 mt-6">
              <li className="bg-white p-4 rounded-lg border border-zinc-200 flex items-start gap-4">
                <code className="bg-zinc-100 px-2 py-1 rounded text-indigo-600 font-bold">/login</code>
                <div>
                  <span className="font-bold text-zinc-900 block">Web Login</span>
                  <span className="text-zinc-600 text-sm">Generates a 6-digit OTP code to log in to this dashboard securely.</span>
                </div>
              </li>
              <li className="bg-white p-4 rounded-lg border border-zinc-200 flex items-start gap-4">
                <code className="bg-zinc-100 px-2 py-1 rounded text-indigo-600 font-bold">/menu</code>
                <div>
                  <span className="font-bold text-zinc-900 block">Main Menu</span>
                  <span className="text-zinc-600 text-sm">Opens the interactive button menu for Reports, History, and Settings.</span>
                </div>
              </li>
              <li className="bg-white p-4 rounded-lg border border-zinc-200 flex items-start gap-4">
                <code className="bg-zinc-100 px-2 py-1 rounded text-indigo-600 font-bold">/reset</code>
                <div>
                  <span className="font-bold text-zinc-900 block">Reset Account</span>
                  <span className="text-zinc-600 text-sm">Resets your initial balances and preferences (Use with caution).</span>
                </div>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

// --- Reusable Component ---
function CommandCard({ title, syntax, examples, result }: { title: string, syntax: string, examples: string[], result: string }) {
  return (
    <div className="bg-white rounded-xl border-l-4 border-indigo-500 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-bold text-zinc-900">{title}</h4>
      </div>
      <p className="text-xs font-mono bg-zinc-100 inline-block px-2 py-1 rounded text-zinc-600 mb-4 border border-zinc-200">
        Format: {syntax}
      </p>
      <div className="space-y-1 mb-4">
        {examples.map((ex, i) => (
          <div key={i} className="text-sm font-mono text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded">
            &gt; {ex}
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-500 border-t border-zinc-100 pt-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" /> {result}
      </p>
    </div>
  );
}