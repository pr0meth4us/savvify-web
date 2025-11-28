import api from "@/lib/api";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface SummaryData {
  balances: Record<string, number>;
  debts_owed_by_you: Array<{ total: number; _id: string }>;
  debts_owed_to_you: Array<{ total: number; _id: string }>;
  periods: Record<string, any>;
}

async function getSummaryData(token: string) {
  try {
    const res = await api.get<SummaryData>("/summary/detailed", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch summary data:", error);
    return null;
  }
}

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");
  const data = await getSummaryData(session.accessToken as string);

  if (!data) {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-lg text-red-700">
        <h3 className="font-bold mb-1">System Error</h3>
        <p className="text-sm">Could not retrieve data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your current financial status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balances Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Current Balances</h3>
            <div className="p-2 bg-slate-50 rounded-full"><div className="w-2 h-2 bg-blue-600 rounded-full"></div></div>
          </div>
          <div className="space-y-3">
            {Object.entries(data.balances).map(([currency, amount]) => (
              <div key={currency} className="flex justify-between items-baseline border-b border-gray-50 pb-2 last:border-0">
                                <span className="text-2xl font-bold text-slate-900">
                                  {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{currency}</span>
              </div>
            ))}
            {Object.keys(data.balances).length === 0 && <p className="text-gray-400 text-sm">No balances recorded.</p>}
          </div>
        </div>

        {/* Owed To You */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Owed To You</h3>
            <div className="p-2 bg-green-50 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full"></div></div>
          </div>
          <div className="space-y-3">
            {data.debts_owed_to_you.length > 0 ? (
              data.debts_owed_to_you.map((debt) => (
                <div key={debt._id} className="flex justify-between items-center">
                                   <span className="text-xl font-semibold text-slate-900">
                                    {debt.total.toLocaleString()}
                                  </span>
                  <span className="text-xs font-medium text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                    {debt._id}
                                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">No active debts owed to you.</p>
            )}
          </div>
        </div>

        {/* You Owe */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">You Owe</h3>
            <div className="p-2 bg-orange-50 rounded-full"><div className="w-2 h-2 bg-orange-500 rounded-full"></div></div>
          </div>
          <div className="space-y-3">
            {data.debts_owed_by_you.length > 0 ? (
              data.debts_owed_by_you.map((debt) => (
                <div key={debt._id} className="flex justify-between items-center">
                                   <span className="text-xl font-semibold text-slate-900">
                                    {debt.total.toLocaleString()}
                                  </span>
                  <span className="text-xs font-medium text-orange-800 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                                    {debt._id}
                                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">You are debt-free.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}