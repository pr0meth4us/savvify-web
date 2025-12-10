// components/auth/auth-guard.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Spinner } from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Ref to track if we are currently performing an async check to prevent double-firing
  const isValidating = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      // Middleware should have caught this, but just in case
      router.replace("/login");
      return;
    }

    const validateSession = async () => {
      if (isValidating.current) return;
      isValidating.current = true;

      try {
        // Fetch fresh profile
        const { data } = await api.get("/users/me");

        // 1. Role Sync
        if (data.role && session?.user?.role !== data.role) {
          console.log(`[AuthGuard] Syncing Role: ${session?.user?.role} -> ${data.role}`);
          await update({ role: data.role });
          router.refresh();
          // We don't return here; we let it fall through to the email check
        }

        // 2. Onboarding Check
        // Check top-level email or nested profile email
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

        // If we get here, everything is good
        setIsChecking(false);

      } catch (error: any) {
        console.error("[AuthGuard] Validation failed:", error);

        // --- THE FIX IS HERE ---
        // If token is invalid (401), kill the NextAuth session explicitly.
        // This clears the cookie so Middleware won't bounce us back.
        if (error.response?.status === 401) {
          await signOut({ callbackUrl: "/login" });
          return;
        }

        // Optional: Handle 500s or network errors differently
        setIsChecking(false);
      } finally {
        isValidating.current = false;
      }
    };

    if (status === "authenticated") {
      validateSession();
    }
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