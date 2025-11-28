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
    if (!code || code.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("bifrost-credentials", {
        otpCode: code,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid or expired code. Please try again.");
        setIsLoading(false);
      } else {
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
    <div className="w-full space-y-4">
      <div className="text-center mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-900">Telegram Login</h3>
        <p className="text-sm text-blue-700 mt-1">
          Open <b>@FinanceBot</b> on Telegram, type <span className="font-mono bg-white px-1 rounded">/login</span>, and enter the code below.
        </p>
      </div>

      <form onSubmit={handleOtpLogin} className="space-y-4">
        <div className="flex justify-center">
          <Input
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="text-center tracking-[0.5em] text-lg font-mono w-48"
            maxLength={6}
            inputMode="numeric"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Verify Code
        </Button>
      </form>
    </div>
  );
}