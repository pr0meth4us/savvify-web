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
        setIsChecking(false);
        return;
      }

      if (status === "authenticated") {
        try {
          // --- CHANGED: Use /users/me instead of /auth/me ---
          // This endpoint exists in your backend (users/routes.py)
          // and returns { profile: { ... }, role: "..." }
          const { data } = await api.get("/users/me");

          // --- CHANGED: Email is nested in the profile object ---
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
          // If the server returns 401/404, we might want to let them stay
          // or redirect to login. For now, we allow the UI to render
          // (premium guard handles the rest).
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