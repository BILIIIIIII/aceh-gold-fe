"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line, // Changed from Area
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  formatCurrency,
  formatXAxisTick,
  formatYAxisLabel,
} from "@/shared/utils/helper";

interface PredictionData {
  date: string;
  xgboost: number;
  lightgbm: number;
  catboost: number;
}

interface PredictionChartProps {
  data: PredictionData[];
}

export function PredictionChart({ data }: PredictionChartProps) {
  return (
    <section className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
        >
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
          <Legend wrapperStyle={{ paddingTop: "2.5rem" }} />{" "}
          {/* Added wrapperStyle for spacing */}
          <Line
            type="monotone"
            dataKey="xgboost"
            stroke="#8884d8"
            strokeWidth={2}
            name="XGBoost"
            dot={false} // Added to remove dots
          />
          <Line
            type="monotone"
            dataKey="lightgbm"
            stroke="#82ca9d"
            strokeWidth={2}
            name="LightGBM"
            dot={false} // Added to remove dots
          />
          <Line
            type="monotone"
            dataKey="catboost"
            stroke="#ffc658"
            strokeWidth={2}
            name="CatBoost"
            dot={false} // Added to remove dots
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
