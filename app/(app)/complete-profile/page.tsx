"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Optional: ask for password to set up email login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Assuming backend has an endpoint to update profile/email
      await api.put("/users/me", {
        email: email,
        // If your backend supports setting a password during this phase:
        // password: password
      });

      // Force reload or redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update profile.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Finish Setting Up</h1>
        <p className="text-slate-500 mt-2">
          Please link an email address to your account to ensure you never lose access.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        {/* Optional: Add Password field if you want them to enable email login immediately */}
        {/* <Input
          label="Create a Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 characters"
        />
        */}

        <Button type="submit" className="w-full" isLoading={loading}>
          Complete Setup
        </Button>
      </form>
    </div>
  );
}