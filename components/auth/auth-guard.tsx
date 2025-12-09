"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Use a ref to prevent overlapping updates causing loops
  const isUpdating = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      setIsChecking(false);
      return;
    }

    const validateSession = async () => {
      // Prevent running validation if we are already in the middle of an update
      if (isUpdating.current) return;

      try {
        // Fetch fresh profile from backend
        const { data } = await api.get("/users/me");

        // --- ROLE SYNC ---
        // Ensure data.role exists before comparing
        if (data.role && session?.user?.role !== data.role) {
          console.log(`[AuthGuard] Syncing Role: ${session?.user?.role} -> ${data.role}`);

          isUpdating.current = true; // Lock

          // Send a simplified payload. 'auth.ts' is now patched to handle { role: ... }
          await update({ role: data.role });

          // Force a router refresh to update server components with the new cookie
          router.refresh();

          isUpdating.current = false; // Unlock
          // We return here because the session update will trigger this effect again with new values
          return;
        }

        // --- ONBOARDING CHECK ---
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
        // If 401, the interceptor handles it.
        isUpdating.current = false;
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