"use client";

import { Debt } from "@/types/api"; // You might need to update types to match grouped response
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface DebtListProps {
  data: any[]; // Grouped data structure from backend
  type: 'lent' | 'borrowed';
  loading: boolean;
  onRepay: (debt: any) => void; // Passing the person object for repayment context
}

export function DebtList({ data, type, loading, onRepay }: DebtListProps) {
  if (loading) {
    return <div className="p-12 text-center text-slate-500 animate-pulse">Loading records...</div>;
  }

  // Filter based on the tab (Lent vs Borrowed)
  const filtered = data.filter(item => item.type === type);

  if (filtered.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
        <p className="text-slate-600 mb-2">No active records found.</p>
        <p className="text-sm text-gray-400">
          {type === 'lent' ? "Nobody owes you money." : "You are debt-free!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((personGroup, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{personGroup.person}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1">
                {type === 'lent' ? 'Owes You' : 'You Owe'}
              </p>
            </div>
            <div className={`p-2 rounded-full ${type === 'lent' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
              {type === 'lent' ? <ArrowRight className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {personGroup.totals.map((t: any, i: number) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{t.currency}</span>
                <span className="font-mono font-medium text-slate-900">
                  {t.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => onRepay(personGroup)}
            >
              Record Repayment
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}