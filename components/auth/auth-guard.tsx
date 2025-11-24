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

      if (status === "authenticated") {
        try {
          const { data } = await api.get("/users/me");
          const isMissingCredentials = !data.profile?.email;

          if (isMissingCredentials && pathname !== "/complete-profile") {
            router.push("/complete-profile");
          }
          else if (!isMissingCredentials && pathname === "/complete-profile") {
            router.push("/dashboard");
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-helm-fog">
        <Spinner size="lg" />
        <p className="mt-4 text-helm-ocean font-medium animate-pulse">
          Verifying coordinates...
        </p>
      </div>
    );
  }

  return <>{children}</>;
} 