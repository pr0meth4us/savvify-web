"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Transaction } from "@/types/api"; // Ensure this type exists in lib/types or types/api
import api from "@/lib/api";

// Categories mapping (aligned with backend)
const EXPENSE_CATS = ["Food", "Drink", "Transport", "Shopping", "Bills", "Entertainment", "Work", "Other"];
const INCOME_CATS = ["Salary", "Bonus", "Freelance", "Allowance", "Gift", "Other"];

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, onSuccess, initialData }: TransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'expense' | 'income'>('expense');

  // Form State
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    category: "Food",
    description: "",
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  });

  // Load data on edit
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setFormData({
        amount: initialData.amount.toString(),
        currency: initialData.currency,
        category: initialData.categoryId,
        description: initialData.description,
        date: new Date(initialData.timestamp).toISOString().split('T')[0]
      });
    } else {
      // Reset on new
      setFormData({
        amount: "",
        currency: "USD",
        category: "Food",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        categoryId: formData.category,
        description: formData.description,
        timestamp: new Date(formData.date).toISOString(),
        accountName: `${formData.currency} Account` // Backend expects this
      };

      if (initialData) {
        await api.put(`/transactions/${initialData._id}`, payload);
      } else {
        await api.post("/transactions/", payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Transaction failed", error);
      // Add toast notification here later
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-helm-navy mb-6">
          {initialData ? "Edit Entry" : "Log Transaction"}
        </h2>

        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-1 bg-helm-fog rounded-lg">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Expense 💸
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Income 💰
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-helm-ocean mb-1">Currency</label>
              <select
                className="w-full h-10 rounded-md border border-helm-fog-dark bg-white px-3 text-sm focus:ring-2 focus:ring-helm-ocean"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-helm-ocean mb-1">Category</label>
            <select
              className="w-full h-10 rounded-md border border-helm-fog-dark bg-white px-3 text-sm focus:ring-2 focus:ring-helm-ocean"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {(type === 'expense' ? EXPENSE_CATS : INCOME_CATS).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="What was this for?"
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
            <Button type="submit" isLoading={loading}>
              {initialData ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}