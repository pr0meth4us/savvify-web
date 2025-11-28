"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TelegramLogin() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!code || code.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // We pass 'otpCode' to the credentials provider
      const result = await signIn("bifrost-credentials", {
        otpCode: code,
        redirect: false,
      });

      if (result?.error) {
        // If Bifrost returns 401/403, NextAuth returns an error
        setError("Invalid or expired code. Please try again.");
        setIsLoading(false);
      } else {
        // Success: Navigate to dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Login Error", err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 mb-6 border border-helm-fog-dark p-6 rounded-lg bg-helm-fog/50">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-helm-navy font-display">Telegram Login</h3>
        <p className="text-xs text-helm-ocean mt-1">
          Go to <span className="font-mono bg-white px-1 rounded border border-helm-fog-dark">@FinanceBot</span>, type <b>/login</b>, and enter the code below.
        </p>
      </div>

      <form onSubmit={handleOtpLogin} className="space-y-4">
        <div className="flex justify-center">
          <Input
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // Only allow numbers
            className="text-center tracking-[0.5em] text-lg font-mono w-48 bg-white"
            maxLength={6}
            inputMode="numeric"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 text-center font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="accent"
          className="w-full"
          isLoading={isLoading}
        >
          Verify & Connect
        </Button>
      </form>
    </div>
  );
}