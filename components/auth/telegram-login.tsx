"use client";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export default function TelegramLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the global callback expected by Telegram's widget
    // @ts-ignore
    window.onTelegramAuth = async (user: TelegramUser) => {
      console.log("Telegram user data received:", user);
      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn("bifrost-credentials", {
          telegramUser: JSON.stringify(user),
          redirect: false,
        });

        if (result?.error) {
          console.error("Telegram Login Failed", result?.error);
          setError("Login failed. Please try again.");
          setIsLoading(false);
        } else {
          // Success: Navigate to dashboard
          router.push("/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.error("Navigation Error", error);
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    // Inject the script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "FinanceBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = ""; // Clear previous renders
      wrapperRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      // @ts-ignore
      delete window.onTelegramAuth;
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4 mb-6">
      {isLoading ? (
        <div className="flex items-center gap-3 text-helm-ocean animate-pulse p-4 bg-helm-fog rounded-lg w-full justify-center">
          <Spinner size="sm" />
          <span className="text-sm font-medium">Verifying coordinates...</span>
        </div>
      ) : (
        <>
          <div ref={wrapperRef} className="min-h-[40px] flex justify-center w-full" />

          {error && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          <div className="text-center space-y-2">
            <p className="text-xs text-helm-ocean/60">
              Click the button above to log in with Telegram
            </p>
            <p className="text-xs text-helm-ocean/60">
              A popup will open - approve the login request
            </p>
          </div>
        </>
      )}
    </div>
  );
}