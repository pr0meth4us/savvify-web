"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Destructure 'update' from useSession
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        setIsChecking(false);
        return;
      }

      if (status === "authenticated") {
        try {
          // Fetch fresh data from backend
          const { data } = await api.get("/users/me");

          // data structure based on your JSON:
          // { profile: { ... }, role: "premium_user" }

          const dbRole = data.role;
          const sessionRole = session?.user?.role;

          // --- THE FIX: SYNC ROLE ---
          // If Backend says "premium" but Session says "user", update the session!
          if (dbRole && dbRole !== sessionRole) {
            console.log(`Syncing Role: ${sessionRole} -> ${dbRole}`);
            await update({ role: dbRole });
            // Force a reload to ensure all components re-render with new permissions
            router.refresh();
          }

          // Check for onboarding (Email)
          const isMissingEmail = !data.profile?.email;
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
  }, [status, router, pathname, session, update]);

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 font-medium">
          Syncing Profile...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}