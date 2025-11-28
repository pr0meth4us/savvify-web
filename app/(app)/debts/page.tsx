"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Debt } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { DebtList } from "@/components/debts/debt-list";
import { DebtModal } from "@/components/debts/debt-modal";
import { RepaymentModal } from "@/components/debts/repayment-modal";

export default function DebtsPage() {
  const [activeTab, setActiveTab] = useState<'lent' | 'borrowed'>('lent');
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [repaymentDebt, setRepaymentDebt] = useState<Debt | null>(null);

  const fetchDebts = async () => {
    setLoading(true);
    try {
      // The backend has endpoints like /debts/list/settled or just /debts for open ones
      // We filter client-side or separate endpoints based on your backend design
      // Assuming GET /debts returns grouped open debts by default
      const res = await api.get<any[]>("/debts/");

      // The backend returns grouped data: [{ person: "John", totals: [...] }]
      // For this UI, we might want a flat list or keep it grouped.
      // Let's assume we want to flatten it for the table or handle the grouping in the list component.
      // For simplicity here, we'll pass the raw grouped data to the list component
      // and let it render "Person cards".
      setDebts(res.data);
    } catch (error) {
      console.error("Failed to fetch debts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Debts & IOUs</h1>
          <p className="text-slate-500 mt-1">Track loans and manage repayments.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Record
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('lent')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'lent'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            Owed to You (Lent)
          </button>
          <button
            onClick={() => setActiveTab('borrowed')}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'borrowed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            You Owe (Borrowed)
          </button>
        </nav>
      </div>

      {/* Content */}
      <DebtList
        data={debts}
        type={activeTab}
        loading={loading}
        onRepay={(debt) => setRepaymentDebt(debt)}
      />

      {/* Modals */}
      <DebtModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchDebts}
      />

      {repaymentDebt && (
        <RepaymentModal
          isOpen={!!repaymentDebt}
          onClose={() => setRepaymentDebt(null)}
          onSuccess={fetchDebts}
          debt={repaymentDebt}
        />
      )}
    </div>
  );
}