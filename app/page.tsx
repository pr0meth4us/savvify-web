// app/page.tsx
import Link from "next/link";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { PublicFooter } from "@/components/ui/PublicFooter";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  MessageSquare,
  Zap,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Send
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
            Stop fighting your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              finance app.
            </span>
          </h1>

          <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Most expense trackers feel like homework.
            Savvify lives in your chat app.
            Just text <strong>"Coffee 5"</strong> and get on with your life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white border-0" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>

            {/* NEW BOT LINK BUTTON */}
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-zinc-200 text-zinc-700 hover:bg-zinc-50 gap-2" asChild>
              <a href="https://t.me/savvify_bot" target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5 text-blue-500" />
                Chat with Bot
              </a>
            </Button>
          </div>

          {/* VISUAL DEMO SECTION START */}
          <div className="relative mx-auto max-w-4xl bg-zinc-900 rounded-2xl p-4 shadow-2xl ring-1 ring-zinc-900/5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-2xl -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              {/* Left: The Chat (Input) */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left relative">
                <div className="absolute -top-3 -left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Step 1: Chat</div>
                <p className="text-zinc-400 text-xs uppercase font-bold mb-4">Telegram</p>
                <div className="space-y-3">
                  <div className="bg-zinc-800 self-start rounded-lg rounded-tl-none p-3 max-w-[80%] text-zinc-300 text-sm">
                    How much was lunch?
                  </div>
                  <div className="bg-indigo-600 self-end ml-auto rounded-lg rounded-tr-none p-3 max-w-[80%] text-white text-sm shadow-lg shadow-indigo-500/20">
                    Lunch 12.50
                  </div>
                  <div className="bg-zinc-800 self-start rounded-lg rounded-tl-none p-3 max-w-[80%] text-zinc-300 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved.
                  </div>
                </div>
              </div>

              {/* Right: The Dashboard (Output) */}
              <div className="bg-white/95 rounded-xl p-6 text-left relative shadow-xl">
                <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Step 2: Done</div>
                <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-2">
                  <span className="font-bold text-zinc-900">Dashboard</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">🍔</div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">Lunch</p>
                        <p className="text-xs text-zinc-500">Today, 12:30 PM</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-zinc-900">-$12.50</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector Arrow (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-xl">
              <ArrowRight className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          {/* VISUAL DEMO SECTION END */}

        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">Everything you need. Nothing you don't.</h2>
            <p className="text-zinc-500 mt-4">Built for speed, accuracy, and real life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <MessageSquare />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Natural Language Logging</h3>
              <p className="text-zinc-500 leading-relaxed">
                Don't fill out forms. Just type like a human. We parse "Taxi $15 to Airport" into Category: Transport, Amount: 15, Note: Airport. It feels like magic.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl shadow-sm text-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Globe />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Currency</h3>
                <p className="text-zinc-400">
                  Spending in USD and KHR? We track it all and normalize your net worth automatically.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Debt & IOUs</h3>
              <p className="text-zinc-500">
                Track who owes you lunch and who you owe rent. Settle debts with a single click.
              </p>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Zero-Access Privacy</h3>
                <p className="text-zinc-500">
                  We don't sell your data. We don't serve ads. Your finances are yours alone.
                </p>
              </div>
              <div className="hidden sm:block">
                <Zap className="w-24 h-24 text-zinc-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-6">
            Get your financial clarity back.
          </h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            Join the smart spenders who have ditched their spreadsheets. Try it free for 30 days.
          </p>
          <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-zinc-900 text-white hover:bg-zinc-800" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <p className="mt-4 text-xs text-zinc-400">No credit card required for setup.</p>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}