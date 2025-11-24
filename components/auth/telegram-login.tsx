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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the global callback expected by Telegram's widget
    // @ts-ignore
    window.onTelegramAuth = async (user: TelegramUser) => {
      setIsLoading(true);
      try {
        const result = await signIn("bifrost-credentials", {
          telegramUser: JSON.stringify(user),
          redirect: false,
        });

        if (result?.error) {
          console.error("Telegram Login Failed", result?.error);
          setIsLoading(false);
        } else {
          // Success: The AuthGuard will handle the profile completion check
          router.push("/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.error("Navigation Error", error);
        setIsLoading(false);
      }
    };

    // Inject the script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    // CRITICAL: This name must match the Bot Name you set in BotFather
    script.setAttribute("data-telegram-login", process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "SavvifyBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = ""; // Clear previous renders
      wrapperRef.current.appendChild(script);
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4 mb-6">
      {isLoading ? (
        <div className="flex items-center gap-3 text-helm-ocean animate-pulse p-4 bg-helm-fog rounded-lg w-full justify-center">
          <Spinner size="sm" />
          <span className="text-sm font-medium">Verifying coordinates...</span>
        </div>
      ) : (
        <div ref={wrapperRef} className="min-h-[40px] flex justify-center w-full" />
      )}
      <p className="text-xs text-helm-ocean/60 text-center">
        Securely connect using your existing Telegram account.
      </p>
    </div>
  );
}