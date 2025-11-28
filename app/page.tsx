import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Master your money <br className="hidden md:block" />
            <span className="text-blue-400">with zero friction.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Savvify makes expense tracking effortless. Log transactions via Telegram in seconds, track multiple currencies, and get clear insights on the web dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="accent" asChild className="w-full sm:w-auto text-lg px-8">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 border-slate-600 text-white hover:bg-slate-800 hover:text-white">
              <Link href="#features">How it Works</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No credit card required · Free 30-day trial
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to stay in control</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We combine the speed of chat with the power of a full dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Instant Logging"
              description="Log expenses naturally in Telegram. Just type 'Lunch 5' and we handle the rest."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
              title="Multi-Currency"
              description="Seamlessly track USD, KHR, and THB. We handle the exchange rates automatically."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-emerald-500" />}
              title="Debt Tracking"
              description="Keep track of who owes you and who you owe. Never forget an IOU again."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Trusted by smart spenders across Southeast Asia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
            <Testimonial
              quote="I used to hate tracking expenses. Savvify made it so easy I actually do it every day now."
              author="Sophea L."
              role="Freelancer"
            />
            <Testimonial
              quote="The multi-currency feature is a lifesaver for my trips between Bangkok and Phnom Penh."
              author="Mark T."
              role="Digital Nomad"
            />
            <Testimonial
              quote="Finally, a simple way to track IOUs with friends without making it awkward."
              author="Dara C."
              role="Small Business Owner"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to take control?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Join thousands of users mastering their finances with Savvify.
          </p>
          <Button size="lg" variant="accent" asChild className="px-10 text-lg">
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="mb-4 bg-slate-50 w-16 h-16 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function Testimonial({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
      <p className="text-slate-700 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  );
}