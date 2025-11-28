"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import api from "@/lib/api";

interface RepaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  debt: any; // The personGroup object passed from the list
}

export function RepaymentModal({ isOpen, onClose, onSuccess, debt }: RepaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD"); // Default currency

  // Determine direction for UI text
  const isLent = debt.type === 'lent';
  const actionText = isLent ? "Receive Payment" : "Make Payment";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calls the backend endpoint: POST /debts/person/<currency>/repay
      await api.post(`/debts/person/${currency}/repay`, {
        amount: parseFloat(amount),
        type: debt.type, // 'lent' or 'borrowed'
        person: debt.person,
        timestamp: new Date().toISOString()
      });

      onSuccess();
      onClose();
      setAmount("");
    } catch (error) {
      console.error("Repayment failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{actionText}</h2>
        <p className="text-sm text-slate-500 mb-6">
          Recording repayment for <strong>{debt.person}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              autoFocus
            />
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Currency</label>
              <select
                className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
                <option value="THB">THB (฿)</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Note: If the currency differs from the original debt, it will be automatically converted at the current rate.
          </p>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="accent" isLoading={loading}>
              Confirm Repayment
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}