"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. If session is loading, do nothing yet
    if (status === "loading") return;

    // 2. If unauthenticated, stop loading (Layout will handle protection/redirects)
    if (status === "unauthenticated") {
      setIsChecking(false);
      return;
    }

    const validateSession = async () => {
      try {
        // CHANGED: Use /users/me because /auth/me is returning 404 in your logs
        // /users/me returns { profile: ..., role: ... }
        const { data } = await api.get("/users/me");

        // --- ROLE SYNC LOGIC ---
        // Only update if there is a mismatch AND we haven't just updated (to prevent loops)
        if (session?.user?.role !== data.role) {
          console.log(`[AuthGuard] Syncing Role: ${session?.user?.role} -> ${data.role}`);

          await update({
            ...session,
            user: { ...session?.user, role: data.role }
          });

          // Force a router refresh to apply server-side permission checks
          router.refresh();
          return; // Stop here, let the effect re-run with new session
        }

        // --- ONBOARDING CHECK ---
        // Check if email is missing (for Telegram users)
        const isMissingEmail = !data.profile?.email && !data.email;
        const isOnCompleteProfile = pathname === "/complete-profile";

        if (isMissingEmail && !isOnCompleteProfile) {
          router.replace("/complete-profile");
          return;
        }

        if (!isMissingEmail && isOnCompleteProfile) {
          router.replace("/dashboard");
          return;
        }

      } catch (error) {
        // If 401/403, the token is invalid.
        // api.ts interceptor usually handles this, but we catch it here to stop the spinner.
        console.error("[AuthGuard] Validation failed:", error);
      } finally {
        setIsChecking(false);
      }
    };

    validateSession();
  }, [status, pathname, update, session, router]);

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 font-medium">Verifying Session...</p>
      </div>
    );
  }

  return <>{children}</>;
}