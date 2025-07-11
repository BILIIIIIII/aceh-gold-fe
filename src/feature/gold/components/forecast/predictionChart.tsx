"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface PredictionData {
  date: string;
  xgboost: number;
  lightgbm: number;
  catboost: number;
}

interface PredictionChartProps {
  data: PredictionData[];
}

const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

const formatXAxisTick = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function PredictionChart({ data }: PredictionChartProps) {
  return (
    <section className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorXgboost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLightgbm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCatboost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={false}
            tickFormatter={formatXAxisTick}
            interval={Math.floor(data.length / 7)}
          />

          <YAxis
            tickFormatter={formatYAxisLabel}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={["auto", "auto"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backdropFilter: "blur(5px)",
            }}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("id-ID", {
                dateStyle: "medium",
              })
            }
            formatter={(value, name) => [formatCurrency(value as number), name]}
          />

          <Legend />

          <Area
            type="monotone"
            dataKey="xgboost"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorXgboost)"
            strokeWidth={2}
            name="XGBoost"
          />
          <Area
            type="monotone"
            dataKey="lightgbm"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorLightgbm)"
            strokeWidth={2}
            name="LightGBM"
          />
          <Area
            type="monotone"
            dataKey="catboost"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#colorCatboost)"
            strokeWidth={2}
            name="CatBoost"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
