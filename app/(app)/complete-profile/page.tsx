"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck, Lock } from "lucide-react";

// Define the steps of the wizard
type Step = "EMAIL" | "OTP" | "PASSWORD";

export default function CompleteProfilePage() {
  const router = useRouter();

  // State management
  const [step, setStep] = useState<Step>("EMAIL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Data storage
  const [email, setEmail] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [proofToken, setProofToken] = useState("");
  const [password, setPassword] = useState("");

  // --- Step 1: Request OTP ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Calls the Flask Proxy: POST /auth/request-email-otp
      const res = await api.post("/auth/request-email-otp", { email });

      // Store the verification ID for the next step
      setVerificationId(res.data.verification_id);

      // Move to Step 2
      setStep("OTP");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to send verification code. Please check the email.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP ---
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Calls the Flask Proxy: POST /auth/verify-email-otp
      const res = await api.post("/auth/verify-email-otp", {
        verification_id: verificationId,
        code: otpCode,
      });

      // Store the signed proof token. This is the key to setting the password.
      setProofToken(res.data.proof_token);

      // Move to Step 3
      setStep("PASSWORD");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Set Password & Finalize ---
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Calls the User Service: POST /users/credentials
      // The backend will verify the proof_token with Bifrost before saving.
      await api.post("/users/credentials", {
        email,
        password,
        proof_token: proofToken,
      });

      // Redirect to dashboard on success
      // Using window.location.href to ensure a full refresh of the session state
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to set password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-20 px-4">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Secure Your Account</h1>
          <p className="text-slate-500 mt-2">
            Link an email address to ensure you never lose your financial data.
          </p>
        </div>

        {/* Wizard Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === "EMAIL" && "Step 1: Verification"}
              {step === "OTP" && "Step 2: Enter Code"}
              {step === "PASSWORD" && "Step 3: Secure Access"}
            </CardTitle>
            <CardDescription>
              {step === "EMAIL" && "We'll send a 6-digit code to verify this address."}
              {step === "OTP" && `Code sent to ${email}`}
              {step === "PASSWORD" && "Create a password for web login."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Global Error Display */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* --- STEP 1 FORM --- */}
            {step === "EMAIL" && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoFocus
                />
                <Button type="submit" className="w-full" isLoading={loading}>
                  Send Verification Code <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* --- STEP 2 FORM --- */}
            {step === "OTP" && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <Input
                    label="Verification Code"
                    type="text"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} // Integers only
                    placeholder="000000"
                    className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                    maxLength={6}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" isLoading={loading}>
                  Verify Code <ShieldCheck className="ml-2 h-4 w-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("EMAIL")}
                  className="w-full text-center text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Entered wrong email? Go back
                </button>
              </form>
            )}

            {/* --- STEP 3 FORM --- */}
            {step === "PASSWORD" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-md flex items-center gap-2 text-sm text-emerald-700 mb-4">
                  <CheckCircle2 className="h-4 w-4" /> Email verified successfully.
                </div>

                <Input
                  label="Create Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  autoFocus
                />

                <Button type="submit" className="w-full" isLoading={loading} variant="accent">
                  Complete Setup <Lock className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}