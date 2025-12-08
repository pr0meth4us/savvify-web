"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0f172a', '#334155', '#475569', '#64748b', '#94a3b8'];

export function SpendingChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-[350px] flex flex-col items-center justify-center text-gray-400">
        <p>No data available yet.</p>
      </Card>
    );
  }

  return (
    <Card className="h-full min-h-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>Spending Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}