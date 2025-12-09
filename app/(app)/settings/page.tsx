"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { UserProfile } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Trash2, Plus, Save, CreditCard, MessageCircle } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Local state for forms
  const [newCategory, setNewCategory] = useState("");
  const [balanceUSD, setBalanceUSD] = useState("");
  const [balanceKHR, setBalanceKHR] = useState("");
  const [rate, setRate] = useState("");

  // Payment State
  const [paymentLoading, setPaymentLoading] = useState(false);

  // --- CONFIGURATION ---
  // THIS is the only place hardcoded. The backend is generic.
  const GUMROAD_PRODUCT_SLUG = "nmfmm";
  const TELEGRAM_SUPPORT_USER = "HelmSupport"; // Change to your handle

  const fetchSettings = async () => {
    try {
      const res = await api.get<{profile: UserProfile}>("/settings/");
      setProfile(res.data.profile);
      if(res.data.profile.settings) {
        setBalanceUSD(res.data.profile.settings.initial_balances?.USD?.toString() || "0");
        setBalanceKHR(res.data.profile.settings.initial_balances?.KHR?.toString() || "0");
        setRate(res.data.profile.settings.fixed_rate?.toString() || "4100");
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

  const handleAddCategory = async (type: 'expense' | 'income') => {
    if (!newCategory.trim()) return;
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
    try {
      await api.delete("/settings/category", { data: { type, name } });
      fetchSettings();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateBalance = async (currency: 'USD' | 'KHR', amount: string) => {
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

  // --- AUTOMATED GUMROAD PAYMENT ---
  const handleUpgrade = async () => {
    setPaymentLoading(true);
    try {
      const res = await api.post("/payments/checkout", {
        provider: "gumroad",
        product_id: GUMROAD_PRODUCT_SLUG // Explicitly sending "nmfmm"
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

  if (loading || !profile) return <div className="flex justify-center p-12"><Spinner /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="grid gap-8">

        {/* --- SUBSCRIPTION SECTION --- */}
        <Card className="border-indigo-100 bg-indigo-50/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-indigo-900">Subscription Status</CardTitle>
                <CardDescription>Unlock advanced analytics and unlimited history.</CardDescription>
              </div>
              {/* TODO: Check user role here to change badge */}
              <div className="px-3 py-1 bg-white rounded-full text-sm font-bold text-indigo-600 border border-indigo-200 uppercase">
                Free Tier
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Option 1: Gumroad (International/Card) */}
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900">Pay with Card / PayPal</h4>
                <p className="text-xs text-slate-500">Instant activation via Gumroad secure checkout.</p>
              </div>
              <Button
                onClick={handleUpgrade}
                variant="primary"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
                isLoading={paymentLoading}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Subscribe ($5/mo)
              </Button>
            </div>

            {/* Option 2: Manual / Local (Telegram) */}
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900">Pay via ABA / KHQR</h4>
                <p className="text-xs text-slate-500">Contact support to pay manually (Local Bank Transfer).</p>
              </div>
              <a
                href={`https://t.me/${TELEGRAM_SUPPORT_USER}?start=upgrade_request`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                Text Support
              </a>
            </div>

          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Display Name (EN)" value={profile.name_en || ''} disabled />
              <Input label="Email" value={profile.email || ''} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Configuration</CardTitle>
            <CardDescription>Set your initial balances and exchange rates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Initial USD Balance</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={balanceUSD}
                    onChange={(e) => setBalanceUSD(e.target.value)}
                  />
                  <Button onClick={() => handleUpdateBalance('USD', balanceUSD)}>Save</Button>
                </div>
              </div>

              {profile.settings.currency_mode === 'dual' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Initial KHR Balance</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={balanceKHR}
                      onChange={(e) => setBalanceKHR(e.target.value)}
                    />
                    <Button onClick={() => handleUpdateBalance('KHR', balanceKHR)}>Save</Button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="text-sm font-medium text-slate-700">Fixed Exchange Rate (1 USD = ? KHR)</label>
              <div className="flex gap-2 mt-2 max-w-xs">
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="4100"
                />
                <Button variant="outline" onClick={handleUpdateRate}><Save className="w-4 h-4 mr-2"/> Set</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Add or remove categories for expenses and income.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Expense Section */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Expense Categories</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.settings.categories.expense.map(cat => (
                    <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-700 border border-rose-100">
                      {cat}
                      <button onClick={() => handleRemoveCategory('expense', cat)} className="ml-2 hover:text-rose-900">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <Input
                    placeholder="New Expense Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button onClick={() => handleAddCategory('expense')} size="sm"><Plus className="w-4 h-4"/></Button>
                </div>
              </div>

              {/* Income Section */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Income Categories</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.settings.categories.income.map(cat => (
                    <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {cat}
                      <button onClick={() => handleRemoveCategory('income', cat)} className="ml-2 hover:text-emerald-900">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <Input
                    placeholder="New Income Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button onClick={() => handleAddCategory('income')} size="sm"><Plus className="w-4 h-4"/></Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}