"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        // Handled by Next.js middleware mostly, but extra safety here
        setIsChecking(false);
        return;
      }

      if (status === "authenticated") {
        try {
          // Fetch full user profile to check for email
          const { data } = await api.get("/users/me");

          // Logic: If user has no email, they MUST go to complete-profile.
          // Unless they are already there.
          const isMissingEmail = !data.email;
          const isOnCompleteProfile = pathname === "/complete-profile";

          if (isMissingEmail && !isOnCompleteProfile) {
            router.push("/complete-profile");
            return; // Stop processing, wait for redirect
          }

          // If they HAVE an email but are trying to access complete-profile, send to dashboard
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
  }, [status, router, pathname]);

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 font-medium">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}