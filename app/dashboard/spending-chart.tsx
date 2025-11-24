"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0A2540', '#2E5C8A', '#4ECDC4', '#FFB84D', '#E8EDF5'];

export function SpendingChart({ data }: { data: ChartData[] }) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Card className="h-[350px] flex flex-col items-center justify-center text-gray-400">
        <p>No navigational data available yet.</p>
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
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E8EDF5' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}