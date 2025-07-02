// app/Main-aceh/components/MainChart.tsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatYAxisLabel } from "../lib/utils";
import { Gold } from "../types/gold";

interface MainChartProps {
  data: Gold[];
}

export function MainChart({ data }: MainChartProps) {
  const formatXAxisTick = (time: string) => {
    const [month, day, year] = time.split("/");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  return (
    <section className="h-[400px] mb-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={false}
            tickFormatter={formatXAxisTick}
            interval={Math.ceil(data.length / 12)}
          />
          <YAxis
            tickFormatter={formatYAxisLabel}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={false}
            formatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(value))
            }
          />
          <defs>
            <linearGradient id="fillIDR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c52289" stopOpacity={1} />
              <stop offset="95%" stopColor="#c52289" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#c52289" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="natural"
            dataKey="close"
            fill="url(#fillIDR)"
            fillOpacity={0.4}
            stroke="#c52289"
            strokeWidth={2}
            stackId={"a"}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export default MainChart;
