import api from "@/lib/api";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Wallet,
  ArrowRightLeft,
  CreditCard
} from "lucide-react";

interface SummaryData {
  balances: Record<string, number>;
  debts_owed_by_you: Array<{ total: number; _id: string }>;
  debts_owed_to_you: Array<{ total: number; _id: string }>;
  periods: Record<string, any>;
}

// Fetch user profile to know the currency mode
async function getUserProfile(token: string) {
  try {
    const res = await api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
    return res.data.profile;
  } catch(e) {
    return null;
  }
}

async function getSummaryData(token: string) {
  try {
    const res = await api.get<SummaryData>("/summary/detailed", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch summary data:", error);
    return null;
  }
}

function ActionButton({ href, icon: Icon, label, colorClass }: { href: string, icon: any, label: string, colorClass: string }) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all active:scale-95"
    >
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">{label}</span>
    </Link>
  );
}

function BalancePill({ currency, amount }: { currency: string, amount: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <span className="text-indigo-100 font-medium">{currency}</span>
      <span className="text-xl font-bold font-mono tracking-tight text-white">
        {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const token = session.accessToken as string;
  const data = await getSummaryData(token);
  const profile = await getUserProfile(token);

  if (!data || !profile) {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-700">
        <h3 className="font-bold mb-1">System Error</h3>
        <p className="text-sm">Could not retrieve financial data. Please try again later.</p>
      </div>
    );
  }

  const totalOwedToYou = data.debts_owed_to_you.reduce((acc, curr) => acc + curr.total, 0);
  const totalYouOwe = data.debts_owed_by_you.reduce((acc, curr) => acc + curr.total, 0);

  const currencyMode = profile.settings.currency_mode || 'dual';
  const primaryCurrency = currencyMode === 'single' ? (profile.settings.primary_currency || 'USD') : 'USD';

  // In single mode, balances might only have one key. In dual, it has USD and KHR.
  const primaryBalance = data.balances[primaryCurrency] || 0;

  // Secondary currencies list (for pills)
  const secondaryCurrencies = Object.keys(data.balances).filter(c => c !== primaryCurrency);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">

      {/* 1. Header & Greeting */}
      <header className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Overview
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">Your financial health at a glance.</p>
        </div>
        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
          {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </header>

      {/* 2. Hero Section: Net Worth Card */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Card */}
        <div className="md:col-span-8 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-500/20">

          {/* Decorative background blur */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-indigo-100 font-medium text-xs uppercase tracking-wider mb-2">
              Primary Balance
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-5xl md:text-6xl font-bold font-mono tracking-tight">
                {primaryBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xl text-indigo-200 font-medium bg-white/10 px-3 py-1 rounded-lg">
                {primaryCurrency}
              </span>
            </div>

            {/* Only show other wallets if they exist (Dual Mode) */}
            {secondaryCurrencies.length > 0 && (
              <div className="mt-4 mb-8 bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-xs text-indigo-200 mb-2 font-semibold uppercase">Other Wallets</p>
                <div className="space-y-1">
                  {secondaryCurrencies.map(currency => (
                    <BalancePill key={currency} currency={currency} amount={data.balances[currency]} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1 text-emerald-300">
                  <ArrowDownLeft className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Owed to You</span>
                </div>
                <p className="text-xl font-bold font-mono text-white">
                  {totalOwedToYou > 0 ? `+${totalOwedToYou.toLocaleString()}` : "—"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1 text-rose-300">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">You Owe</span>
                </div>
                <p className="text-xl font-bold font-mono text-white">
                  {totalYouOwe > 0 ? `-${totalYouOwe.toLocaleString()}` : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Quick Actions Grid */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
          <ActionButton href="/transactions" icon={Plus} label="Log Expense" colorClass="bg-rose-500 text-rose-600" />
          <ActionButton href="/transactions" icon={ArrowRightLeft} label="Add Income" colorClass="bg-emerald-500 text-emerald-600" />
          <ActionButton href="/debts" icon={Wallet} label="New IOU" colorClass="bg-amber-500 text-amber-600" />
          <ActionButton href="/debts" icon={CreditCard} label="Settle Debt" colorClass="bg-indigo-500 text-indigo-600" />
        </div>
      </section>

      {/* 4. Insight / Placeholder Section */}
      <section>
        <div className="flex items-center justify-between px-2 mb-4">
          <h2 className="text-lg font-bold text-zinc-900">Monthly Insight</h2>
          <Link href="/analytics" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View Report →
          </Link>
        </div>

        <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-50 rounded-full mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-zinc-900 font-semibold mb-2">Spending Analysis</h3>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            Your detailed spending breakdown for this month is being calculated. Log more transactions to see trends.
          </p>
        </div>
      </section>
    </div>
  );
}