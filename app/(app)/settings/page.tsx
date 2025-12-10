"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import api from "@/lib/api";
import { UserProfile } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Trash2, Plus, Save, CreditCard, MessageCircle, Star, Download, AlertTriangle, User, Mail, ShieldCheck } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form State
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState(""); // Track initial to detect changes
  const [otpCode, setOtpCode] = useState("");
  const [proofToken, setProofToken] = useState("");
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false); // UI State for OTP input
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Local state for forms
  const [newCategory, setNewCategory] = useState("");
  const [balanceUSD, setBalanceUSD] = useState("");
  const [balanceKHR, setBalanceKHR] = useState("");
  const [rate, setRate] = useState("");
  // Mode & Currency state
  const [currencyMode, setCurrencyMode] = useState<'single' | 'dual'>('dual');
  const [primaryCurrency, setPrimaryCurrency] = useState("USD");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const SUPPORTED_CURRENCIES = ["USD", "KHR", "EUR", "GBP", "SGD", "JPY", "CNY", "AUD", "CAD"];
  const GUMROAD_PRODUCT_SLUG = "nmfmm";
  const TELEGRAM_SUPPORT_USER = "HelmSupport";

  const role = session?.user?.role || "user";
  const isPremium = role === "premium_user" || role === "admin";

  const fetchSettings = async () => {
    try {
      const res = await api.get<{profile: UserProfile, email: string}>("/users/me");
      const p = res.data.profile;

      // Merge email from root response (from auth token) into profile object for UI consistency
      const userEmail = res.data.email || p.email || "";

      setProfile(p);
      setDisplayName(p.name_en || "");
      setEmail(userEmail);
      setOriginalEmail(userEmail);

      if(p.settings) {
        setBalanceUSD(p.settings.initial_balances?.USD?.toString() || "0");
        setBalanceKHR(p.settings.initial_balances?.KHR?.toString() || "0");
        setRate(p.settings.fixed_rate?.toString() || "4100");
        setCurrencyMode(p.settings.currency_mode || 'dual');
        setPrimaryCurrency(p.settings.primary_currency || 'USD');

        if (p.settings.currency_mode === 'single') {
          const curr = p.settings.primary_currency || 'USD';
          const val = p.settings.initial_balances?.[curr] || 0;
          setBalanceUSD(val.toString());
        }
      }
    } catch (error) {
      console.error("Failed to load settings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // --- PROFILE LOGIC ---

  const handleRequestOtp = async () => {
    try {
      await api.post("/auth/request-email-otp", { email });
      setOtpSent(true);
      setIsVerifyingEmail(true);
      alert(`Verification code sent to ${email}`);
    } catch (e: any) {
      alert(e.response?.data?.error || "Failed to send code");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Find verification ID logic is hidden in standard auth flow usually,
      // but here we just send code and email to verify-otp endpoint?
      // The proxy endpoint in auth/routes.py expects verification_id.
      // NOTE: Our simple proxy setup in `web_service` calls Bifrost.
      // Bifrost's `verify_otp` needs `verification_id` OR (`identifier` + `code`).
      // Let's modify the frontend to call the proxy with email as identifier if ID missing?
      // Actually, Bifrost model supports identifier lookup.
      // But `auth_api.py` in Bifrost expects verification_id.
      // Let's assume the request-otp returns verification_id.

      // RE-RUN REQUEST to capture ID properly if needed, but for now let's assume
      // the user initiates the flow.
      // Actually, `request-email-otp` returns `verification_id`. We need to capture it.
      // Let's fix handleRequestOtp above first.

      // Wait, we can't easily capture it without modifying state.
      // Let's adjust handleRequestOtp to store the ID.
      const res = await api.post("/auth/request-email-otp", { email });
      const verId = res.data.verification_id;
      if(!verId) throw new Error("No ID returned");

      // Now actually verify
      const verifyRes = await api.post("/auth/verify-email-otp", {
        verification_id: verId,
        code: otpCode
      });

      if(verifyRes.data.proof_token) {
        setProofToken(verifyRes.data.proof_token);
        setEmailVerified(true);
        setIsVerifyingEmail(false); // Close OTP box
        alert("Email verified! You can now save changes.");
      }
    } catch (e: any) {
      // Fallback: If the user already clicked "Send" previously and we lost state,
      // we might fail. But in this single-page flow, variables hold.
      // If request-otp was void, we call it again inside verify? No.
      console.error(e);
      alert("Verification failed. Please try sending the code again.");
    }
  };

  // Revised Request OTP that stores the ID locally in the closure or state?
  // Let's add a state for it.
  const [verificationId, setVerificationId] = useState("");

  const handleRequestOtpReal = async () => {
    try {
      const res = await api.post("/auth/request-email-otp", { email });
      if(res.data.verification_id) {
        setVerificationId(res.data.verification_id);
        setOtpSent(true);
        setIsVerifyingEmail(true);
      }
    } catch(e: any) {
      alert(e.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtpReal = async () => {
    if(!verificationId) return;
    try {
      const res = await api.post("/auth/verify-email-otp", {
        verification_id: verificationId,
        code: otpCode
      });
      if(res.data.proof_token) {
        setProofToken(res.data.proof_token);
        setEmailVerified(true);
        setIsVerifyingEmail(false);
      }
    } catch(e: any) {
      alert("Invalid code");
    }
  };

  const handleSaveProfile = async () => {
    if (email !== originalEmail && !emailVerified) {
      alert("Please verify your new email address first.");
      return;
    }

    try {
      const payload: any = { name_en: displayName };
      if (email !== originalEmail) {
        payload.email = email;
        payload.proof_token = proofToken;
      }

      await api.put("/users/me", payload);
      alert("Profile updated successfully.");

      // Update session to reflect changes immediately
      await updateSession();
      window.location.reload();
    } catch (e: any) {
      alert(e.response?.data?.error || "Failed to update profile");
    }
  };

  // --- CATEGORY LOGIC ---
  const handleAddCategory = async (type: 'expense' | 'income') => {
    if (!newCategory.trim()) return;
    if (!isPremium) return alert("Custom categories are a Premium feature.");
    try {
      await api.post("/settings/category", { type, name: newCategory });
      setNewCategory("");
      fetchSettings();
    } catch (e) {
      console.error(e);
    }
  };
  const handleRemoveCategory = async (type: 'expense' | 'income', name: string) => {
    if(!confirm(`Remove category "${name}"?`)) return;
    if (!isPremium) return alert("Managing categories is a Premium feature.");
    try {
      await api.delete("/settings/category", { data: { type, name } });
      fetchSettings();
    } catch (e) {
      console.error(e);
    }
  };

  // --- BALANCE LOGIC ---
  const handleUpdateBalance = async (currency: string, amount: string) => {
    try {
      await api.post("/settings/balance", { currency, amount: parseFloat(amount) });
      alert(`${currency} Balance Updated`);
    } catch (e) {
      console.error(e);
    }
  };
  const handleUpdateRate = async () => {
    try {
      await api.post("/settings/rate", { rate: parseFloat(rate) });
      alert("Fixed Exchange Rate Updated");
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveMode = async () => {
    try {
      await api.post("/settings/mode", {
        mode: currencyMode,
        primary_currency: primaryCurrency
      });
      alert("Currency settings saved.");
      window.location.reload();
    } catch(e) {
      console.error(e);
      alert("Failed to save mode.");
    }
  };

  // --- SUBSCRIPTION LOGIC ---
  const handleUpgrade = async () => {
    setPaymentLoading(true);
    try {
      const res = await api.post("/payments/checkout", {
        provider: "gumroad",
        product_id: GUMROAD_PRODUCT_SLUG
      });
      const data = res.data;
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Could not generate payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  // --- DATA LOGIC ---
  const handleExportData = async () => {
    try {
      const res = await api.post("/users/data/export");
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `savvify_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch(e) {
      alert("Export failed.");
    }
  };
  const handleDeleteAccount = async () => {
    const confirmText = prompt("Type 'DELETE' to confirm permanent account deletion. This cannot be undone.");
    if (confirmText === 'DELETE') {
      try {
        await api.delete("/users/data/delete");
        await signOut({ callbackUrl: "/" });
      } catch(e) {
        alert("Deletion failed.");
      }
    }
  };

  if (loading || !profile) return <div className="flex justify-center p-12"><Spinner /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="grid gap-8">

        {/* --- PROFILE SETTINGS (NEW) --- */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage your public display name and login credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    className="pl-9"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-9"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailVerified(false); // Reset verification if typed
                      }}
                    />
                  </div>
                  {email !== originalEmail && !emailVerified && (
                    <Button onClick={handleRequestOtpReal} variant="outline">
                      Verify
                    </Button>
                  )}
                  {emailVerified && (
                    <div className="flex items-center text-emerald-600 px-3 bg-emerald-50 rounded-md border border-emerald-100">
                      <ShieldCheck className="w-4 h-4 mr-2" /> Verified
                    </div>
                  )}
                </div>
                {/* OTP Input UI */}
                {isVerifyingEmail && !emailVerified && (
                  <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in slide-in-from-top-2">
                    <label className="text-xs font-bold text-blue-800 uppercase">Verification Code</label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="000000"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="bg-white"
                        maxLength={6}
                      />
                      <Button onClick={handleVerifyOtpReal}>Confirm</Button>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">Sent to {email}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveProfile} disabled={email !== originalEmail && !emailVerified}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* --- SUBSCRIPTION SECTION --- */}
        <Card className={`border-indigo-100 ${isPremium ? "bg-gradient-to-r from-indigo-50 to-white" : "bg-indigo-50/50"}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-indigo-900">Subscription Status</CardTitle>
                <CardDescription>Unlock advanced analytics and unlimited history.</CardDescription>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold border uppercase flex items-center gap-2 ${
                isPremium
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200"
              }`}>
                {isPremium && <Star className="w-4 h-4 fill-current" />}
                {isPremium ? "Premium Active" : "Free Tier"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPremium ? (
              <>
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">Pay with Card / PayPal</h4>
                    <p className="text-xs text-slate-500">Instant activation via Gumroad secure checkout.</p>
                  </div>
                  <Button onClick={handleUpgrade} variant="primary" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0" isLoading={paymentLoading}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Subscribe ($5/mo)
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">Pay via ABA / KHQR</h4>
                    <p className="text-xs text-slate-500">Contact support to pay manually (Local Bank Transfer).</p>
                  </div>
                  <a href={`https://t.me/${TELEGRAM_SUPPORT_USER}?start=upgrade_request`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                    Text Support
                  </a>
                </div>
              </>
            ) : (
              <div className="text-sm text-indigo-700 font-medium">
                Thank you for supporting Savvify! You have full access to all features.
              </div>
            )}
          </CardContent>
        </Card>

        {/* --- CURRENCY MODE --- */}
        <Card>
          <CardHeader>
            <CardTitle>Currency Configuration</CardTitle>
            <CardDescription>Choose how you want to track your money.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrencyMode('dual')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${currencyMode === 'dual' ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 bg-white text-slate-500'}`}
              >
                <div className="font-bold mb-1">Dual Mode</div>
                <div className="text-xs">Track USD & KHR simultaneously. Perfect for Cambodia.</div>
              </button>
              <button
                onClick={() => setCurrencyMode('single')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${currencyMode === 'single' ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 bg-white text-slate-500'}`}
              >
                <div className="font-bold mb-1">Single Mode</div>
                <div className="text-xs">Track one currency only (e.g., USD, EUR).</div>
              </button>
            </div>

            {currencyMode === 'single' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Primary Currency</label>
                <select
                  value={primaryCurrency}
                  onChange={(e) => setPrimaryCurrency(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  {SUPPORTED_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleSaveMode}>Save Configuration</Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Initial Balances</CardTitle>
            <CardDescription>Set the starting amount for your accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Primary Balance Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Initial {currencyMode === 'single' ? primaryCurrency : 'USD'} Balance
                </label>
                <div className="flex gap-2">
                  <Input type="number" value={balanceUSD} onChange={(e) => setBalanceUSD(e.target.value)} />
                  <Button onClick={() => handleUpdateBalance(currencyMode === 'single' ? primaryCurrency : 'USD', balanceUSD)}>Save</Button>
                </div>
              </div>

              {/* Secondary Balance Input (Dual Mode Only) */}
              {currencyMode === 'dual' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Initial KHR Balance</label>
                  <div className="flex gap-2">
                    <Input type="number" value={balanceKHR} onChange={(e) => setBalanceKHR(e.target.value)} />
                    <Button onClick={() => handleUpdateBalance('KHR', balanceKHR)}>Save</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Rate is only relevant for Dual mode */}
            {currencyMode === 'dual' && (
              <div className="pt-6 border-t border-slate-100">
                <label className="text-sm font-medium text-slate-700">Fixed Exchange Rate (1 USD = ? KHR)</label>
                <div className="flex gap-2 mt-2 max-w-xs">
                  <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="4100" />
                  <Button variant="outline" onClick={handleUpdateRate}><Save className="w-4 h-4 mr-2"/> Set</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Manager */}
        <Card className={!isPremium ? "opacity-75" : ""}>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Add or remove categories for expenses and income.</CardDescription>
              </div>
              {!isPremium && (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 h-fit">
                        🔒 Premium
                    </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="relative">
            {!isPremium && (
              <div className="absolute inset-0 z-10 bg-white/50 cursor-not-allowed" title="Upgrade to Premium to edit categories" />
            )}
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Expense Categories</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.settings.categories.expense.map(cat => (
                    <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-700 border border-rose-100">
                      {cat}
                      <button onClick={() => handleRemoveCategory('expense', cat)} disabled={!isPremium} className="ml-2 hover:text-rose-900 disabled:opacity-0">
                         <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <Input placeholder="New Expense Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} disabled={!isPremium} />
                  <Button onClick={() => handleAddCategory('expense')} size="sm" disabled={!isPremium}><Plus className="w-4 h-4"/></Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Income Categories</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.settings.categories.income.map(cat => (
                    <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {cat}
                      <button onClick={() => handleRemoveCategory('income', cat)} disabled={!isPremium} className="ml-2 hover:text-emerald-900 disabled:opacity-0">
                        <Trash2 className="w-3 h-3" />
                       </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <Input placeholder="New Income Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} disabled={!isPremium} />
                  <Button onClick={() => handleAddCategory('income')} size="sm" disabled={!isPremium}><Plus className="w-4 h-4"/></Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DATA PRIVACY */}
        <Card className="border-red-100 bg-red-50/10">
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your personal data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" /> Export My Data
              </Button>
              <Button variant="danger" onClick={handleDeleteAccount}>
                <AlertTriangle className="w-4 h-4 mr-2" /> Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}