"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { UserProfile } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Trash2, Plus, Save, CreditCard, QrCode } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/Modal";
import { QRCodeSVG } from 'qrcode.react';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Local state for forms
  const [newCategory, setNewCategory] = useState("");
  const [balanceUSD, setBalanceUSD] = useState("");
  const [balanceKHR, setBalanceKHR] = useState("");
  const [rate, setRate] = useState("");

  // Payment States
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const res = await api.get<{profile: UserProfile}>("/settings/");
      setProfile(res.data.profile);
      setBalanceUSD(res.data.profile.settings.initial_balances.USD.toString());
      setBalanceKHR(res.data.profile.settings.initial_balances.KHR.toString());
      setRate(res.data.profile.settings.fixed_rate.toString());
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

  // --- NEW: Handle Upgrade Logic ---
  const handleUpgrade = async (provider: 'gumroad' | 'payway') => {
    setPaymentLoading(true);
    setQrCodeData(null);

    try {
      const res = await api.post("/payments/checkout", {
        provider: provider,
        product_id: "savvify-premium"
      });

      const data = res.data;

      if (provider === 'gumroad' && data.payment_url) {
        // Redirect to Gumroad
        window.location.href = data.payment_url;
      } else if (provider === 'payway' && data.qr_string) {
        // Show QR Code in Modal
        setQrCodeData(data.qr_string);
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

        {/* --- NEW: Subscription Card --- */}
        <Card className="border-indigo-100 bg-indigo-50/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-indigo-900">Subscription Status</CardTitle>
                <CardDescription>Unlock advanced analytics and unlimited history.</CardDescription>
              </div>
              {/* Visual badge for current status. Note: You should ideally fetch 'role' from profile or session */}
              <div className="px-3 py-1 bg-white rounded-full text-sm font-bold text-indigo-600 border border-indigo-200 uppercase">
                Free Tier
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsUpgradeModalOpen(true)} variant="primary" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Upgrade to Premium ($5/mo)
            </Button>
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
            <div className="text-xs text-slate-400">
              To change these details, please contact support.
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
              <p className="text-xs text-slate-500 mt-2">
                Currently using: <span className="font-mono font-bold text-indigo-600">{profile.settings.rate_preference.toUpperCase()}</span> rate.
              </p>
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

      {/* --- NEW: Payment Method Modal --- */}
      <Modal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Choose Payment Method</h2>

          {qrCodeData ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-xl shadow-inner border border-slate-200">
                <p className="text-xs text-center text-slate-400 break-all mb-2">Scan with ABA Mobile</p>
                <div className="bg-white p-2">
                  <QRCodeSVG value={qrCodeData} size={200} />
                </div>
              </div>
              <p className="text-sm text-center text-emerald-600 font-medium animate-pulse">
                Waiting for payment...
              </p>
              <Button variant="ghost" onClick={() => setIsUpgradeModalOpen(false)}>Close</Button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => handleUpgrade('payway')}
                disabled={paymentLoading}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">ABA PayWay (KHQR)</p>
                    <p className="text-xs text-slate-500">Scan with any Cambodia banking app</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleUpgrade('gumroad')}
                disabled={paymentLoading}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-2 rounded-lg">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">Credit/Debit Card</p>
                    <p className="text-xs text-slate-500">Secure payment via Gumroad</p>
                  </div>
                </div>
              </button>

              {paymentLoading && (
                <div className="flex justify-center items-center gap-2 mt-4 text-sm text-slate-500">
                  <Spinner size="sm" /> Connecting to gateway...
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}