"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import api from "@/lib/api";

interface DebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DebtModal({ isOpen, onClose, onSuccess }: DebtModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'lent' | 'borrowed'>('lent');

  const [formData, setFormData] = useState({
    person: "",
    amount: "",
    currency: "USD",
    purpose: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/debts/", {
        type,
        person: formData.person,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        purpose: formData.purpose,
        timestamp: new Date(formData.date).toISOString(),
      });
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        person: "", amount: "", currency: "USD", purpose: "",
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Failed to add debt", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">New Debt Record</h2>

        <div className="grid grid-cols-2 gap-4 mb-6 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setType('lent')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              type === 'lent' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            I Lent Money 📤
          </button>
          <button
            type="button"
            onClick={() => setType('borrowed')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              type === 'borrowed' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            I Borrowed 📥
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Person Name"
            required
            value={formData.person}
            onChange={(e) => setFormData({...formData, person: e.target.value})}
            placeholder="e.g. John Doe"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
            />
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Currency</label>
              <select
                className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
              </select>
            </div>
          </div>

          <Input
            label="Purpose (Optional)"
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            placeholder="e.g. Lunch, Rent"
          />

          <Input
            label="Date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" isLoading={loading}>Save Record</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}