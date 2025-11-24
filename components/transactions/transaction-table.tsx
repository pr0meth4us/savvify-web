"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit2, Trash2, ArrowUpCircle, ArrowDownCircle, Search } from "lucide-react";
import { Transaction } from "@/types/api";
import { Input } from "@/components/ui/Input";

interface TransactionTableProps {
  data: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export function TransactionTable({ data, onEdit, onDelete, isLoading }: TransactionTableProps) {
  const [search, setSearch] = useState("");

  // Client-side filtering for speed
  const filteredData = data.filter(
    (tx) =>
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.categoryId?.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return <div className="p-8 text-center text-helm-ocean animate-pulse">Loading flight logs...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-helm-fog-dark rounded-xl">
        <p className="text-helm-ocean mb-4">No transactions recorded yet.</p>
        <p className="text-sm text-gray-400">Start charting your course by adding an expense or income.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-helm-fog-dark bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-helm-fog border-b border-helm-fog-dark">
          <tr>
            <th className="px-4 py-3 font-medium text-helm-navy">Date</th>
            <th className="px-4 py-3 font-medium text-helm-navy">Category</th>
            <th className="px-4 py-3 font-medium text-helm-navy">Description</th>
            <th className="px-4 py-3 font-medium text-helm-navy text-right">Amount</th>
            <th className="px-4 py-3 font-medium text-helm-navy text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-helm-fog-dark">
          {filteredData.map((tx) => (
            <tr key={tx._id} className="hover:bg-helm-fog/50 transition-colors group">
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {format(new Date(tx.timestamp), "MMM dd, yyyy")}
              </td>
              <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-helm-fog px-2.5 py-0.5 text-xs font-medium text-helm-ocean">
                    {tx.categoryId}
                  </span>
              </td>
              <td className="px-4 py-3 text-gray-900 font-medium max-w-xs truncate">
                {tx.description || "-"}
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2">
                    <span className={tx.type === 'income' ? 'text-green-600' : 'text-helm-navy'}>
                      {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()} {tx.currency}
                    </span>
                  {tx.type === 'income' ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(tx)} className="p-1 text-gray-400 hover:text-helm-ocean">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(tx._id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}