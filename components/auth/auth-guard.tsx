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
    const checkProfile = async () => {
      // 1. Wait for session to load
      if (status === "loading") return;

      // 2. If unauthenticated, stop checking (middleware or layout usually handles redirect,
      // but we set checking false to render nothing/children based on logic)
      if (status === "unauthenticated") {
        setIsChecking(false);
        return;
      }

      // 3. If authenticated, validate backend profile state
      if (status === "authenticated") {
        try {
          const { data } = await api.get("/auth/me");

          // Sync Role Mismatch: If backend role changed (e.g. upgraded to premium), update session
          if (session?.user?.role !== data.role) {
            await update({
              ...session,
              user: { ...session?.user, role: data.role }
            });
            // Force a reload to ensure new role permissions apply
            router.refresh();
          }

          // Onboarding Check
          const isMissingEmail = !data.email;
          const isOnCompleteProfile = pathname === "/complete-profile";

          if (isMissingEmail && !isOnCompleteProfile) {
            router.push("/complete-profile");
            return;
          }

          if (!isMissingEmail && isOnCompleteProfile) {
            router.push("/dashboard");
            return;
          }

        } catch (error) {
          console.error("Profile check failed", error);
        }
      }

      setIsChecking(false);
    };

    checkProfile();
  }, [status, router, pathname, update, session]);

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 font-medium">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}