"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { AnalyticsReport } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ArrowDownRight, ArrowUpRight, Wallet, Calendar } from "lucide-react";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsReport | null>(null);
  const [period, setPeriod] = useState("this_month"); // 'this_month', 'last_30'

  const fetchReport = async () => {
    setLoading(true);
    try {
      let start = new Date();
      let end = new Date();

      if (period === "this_month") {
        start = startOfMonth(new Date());
        end = endOfMonth(new Date());
      } else {
        start = subDays(new Date(), 30);
      }

      const res = await api.get<AnalyticsReport>("/analytics/report/detailed", {
        params: {
          start_date: format(start, "yyyy-MM-dd"),
          end_date: format(end, "yyyy-MM-dd"),
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [period]);

  if (loading) return <div className="flex h-96 items-center justify-center"><Spinner size="lg" /></div>;
  if (!data) return <div className="p-8 text-center text-slate-500">Failed to load data.</div>;

  const { summary, expenseBreakdown, spendingOverTime } = data;

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Insights</h1>
          <p className="text-slate-500 mt-1">Deep dive into your spending habits.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setPeriod("this_month")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              period === "this_month" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod("last_30")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              period === "last_30" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Total Income</span>
              <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              ${summary.totalIncomeUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Total Expense</span>
              <div className="p-2 bg-rose-100 rounded-full text-rose-600">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              ${summary.totalExpenseUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Net Savings</span>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-2xl font-bold ${summary.netSavingsUSD >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {summary.netSavingsUSD >= 0 ? '+' : ''}${summary.netSavingsUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Trend Chart */}
        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingOverTime}>
                <defs>
                  <linearGradient id="colorSplit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => format(new Date(str), "d MMM")}
                  tick={{fontSize: 12, fill: '#64748b'}}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{fontSize: 12, fill: '#64748b'}}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Spent"]}
                  labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
                />
                <Area
                  type="monotone"
                  dataKey="total_spent_usd"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorSplit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            {expenseBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="totalUSD"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                No expense data for this period.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}