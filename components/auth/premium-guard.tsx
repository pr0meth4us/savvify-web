"use client";

import { useSession } from "next-auth/react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const role = session?.user?.role || "user";

  // Allow admins and premium users
  const isPremium = role === "premium_user" || role === "admin";

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-slate-50 p-12 text-center shadow-sm">
      {/* Blur Overlay Effect */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-indigo-100 p-4">
          <Lock className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Premium Feature Locked</h3>
        <p className="max-w-md text-slate-500">
          This feature provides advanced analytics and unlimited history.
          Upgrade your account to unlock full access.
        </p>
        <Button asChild variant="accent" size="lg" className="mt-4">
          <Link href="/settings">Upgrade to Premium</Link>
        </Button>
      </div>
    </div>
  );
}