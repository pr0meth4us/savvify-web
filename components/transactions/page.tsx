"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types/api";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionModal } from "@/components/transactions/transaction-modal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Using the search endpoint with empty params to get a consistent list
      // or /recent if preferred. Search allows better filtering later.
      const res = await api.post<Transaction[]>("/transactions/search", {
        limit: 50 // Fetch last 50
      });
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to jettison this record?")) return;

    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions(); // Refresh list
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-helm-navy font-display">Transaction Log</h1>
          <p className="text-helm-ocean mt-1">Navigate your spending history.</p>
        </div>
        <Button onClick={handleAdd} className="shadow-lg shadow-helm-navy/20">
          <Plus className="mr-2 h-4 w-4" />
          Log Entry
        </Button>
      </div>

      <TransactionTable
        data={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchTransactions();
        }}
        initialData={editingTx}
      />
    </div>
  );
}