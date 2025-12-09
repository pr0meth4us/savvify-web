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
    // 1. Loading state: wait
    if (status === "loading") return;

    // 2. Unauthenticated: let the layout/middleware handle redirects
    if (status === "unauthenticated") {
      setIsChecking(false);
      return;
    }

    const validateSession = async () => {
      try {
        // Fetch current profile from backend
        // Note: The backend MUST return the 'email' field for this check to work
        const { data } = await api.get("/users/me");

        // --- ROLE SYNC ---
        // Only update if role differs to avoid loops
        if (session?.user?.role !== data.role) {
          console.log(`[AuthGuard] Syncing Role: ${session?.user?.role} -> ${data.role}`);
          await update({
            ...session,
            user: { ...session?.user, role: data.role }
          });
          // Do NOT return here; continue to onboarding check
        }

        // --- ONBOARDING CHECK ---
        // Check if user needs to link an email (common for Telegram-first users)
        // We look at the top-level email or the profile email
        const hasEmail = data.email || (data.profile && data.profile.email);
        const isOnCompleteProfile = pathname === "/complete-profile";

        if (!hasEmail && !isOnCompleteProfile) {
          router.replace("/complete-profile");
          return;
        }

        if (hasEmail && isOnCompleteProfile) {
          router.replace("/dashboard");
          return;
        }

      } catch (error) {
        console.error("[AuthGuard] Validation failed:", error);
        // If 401, the interceptor will handle it.
      } finally {
        setIsChecking(false);
      }
    };

    validateSession();
  }, [status, pathname, router, session?.user?.role, update]);

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