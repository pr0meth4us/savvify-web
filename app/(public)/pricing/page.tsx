import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="bg-zinc-50 min-h-screen py-24">
      <div className="container mx-auto max-w-5xl px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            Simple, honest pricing.
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            We don't do "Basic" or "Pro" tiers. You get everything.
            <br />
            <span className="text-indigo-600 font-medium">Try it free for 30 days.</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Monthly Card */}
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-500 uppercase tracking-wider">Monthly</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold text-zinc-900">$5</span>
                <span className="text-zinc-400">/mo</span>
              </div>
              <p className="text-sm text-zinc-400 mt-2">Billed monthly. Cancel anytime.</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <Feature text="Full Transaction History" />
              <Feature text="Unlimited Telegram Sync" />
              <Feature text="Advanced Analytics" />
            </ul>

            <Button size="lg" variant="outline" className="w-full rounded-xl" asChild>
              <Link href="/signup">Start Monthly Trial</Link>
            </Button>
          </div>

          {/* Yearly Card (Highlighted) */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl flex flex-col relative overflow-hidden text-white transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              MOST POPULAR
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-indigo-300 uppercase tracking-wider">Yearly</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold text-white">$48</span>
                <span className="text-zinc-400">/yr</span>
              </div>
              <p className="text-sm text-zinc-400 mt-2">Save 20% compared to monthly.</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <Feature text="Everything in Monthly" dark />
              <Feature text="Priority Support" dark />
              <Feature text="Early Access to New Features" dark />
            </ul>

            <Button size="lg" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0" asChild>
              <Link href="/signup">Start Yearly Trial</Link>
            </Button>
            <p className="text-center text-xs text-zinc-500 mt-3">30-day money-back guarantee</p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Feature({ text, dark = false }: { text: string, dark?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <div className={`rounded-full p-1 ${dark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-green-100 text-green-600'}`}>
        <Check className="w-3 h-3" strokeWidth={3} />
      </div>
      <span className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{text}</span>
    </li>
  )
}