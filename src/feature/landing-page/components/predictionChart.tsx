"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// Impor tipe data untuk props tooltip dari recharts
import type { TooltipProps } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/shared/shadcn-components/ui/chart";
import { formatCompactNumber } from "@/shared/utils/helper";

// --- INTERFACE ---
interface LineConfig {
  key: string;
  name: string;
  color: string;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface PredictionChartProps {
  data: ChartDataPoint[];
  lines: LineConfig[];
}

type CustomTooltipProps = TooltipProps<number, string> & {
  lines: LineConfig[];
};

const CustomTooltip = ({
  active,
  payload,
  label,
  lines,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const formattedDate = new Date(label as string).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return (
      <div className="min-w-[200px] rounded-lg border bg-background p-2 shadow-sm">
        <div className="mb-2">
          <p className="text-xs font-medium">{formattedDate}</p>
        </div>
        <div className="my-1.5 h-px bg-muted" />
        <div className="space-y-2">
          {lines.map((line: LineConfig) => {
            const cityData = payload.find((p) => p.dataKey === line.key);
            if (!cityData) return null;

            return (
              <div
                key={line.key}
                className="w-[250px] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-0.5 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: line.color }}
                  />
                  <p className="text-xs text-muted-foreground">{line.name}</p>
                </div>
                <p className="text-right text-xs font-medium">
                  {(cityData.value as number).toLocaleString("id-ID")}
                  <span className="text-muted-foreground/80"> IDR</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export function PredictionChart({ data, lines }: PredictionChartProps) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    lines.forEach((line) => {
      config[line.key] = {
        label: line.name,
        color: line.color,
      };
    });
    return config;
  }, [lines]);

  const allValues = data
    .flatMap((d) => lines.map((l) => d[l.key] as number))
    .filter((v) => v != null && isFinite(v));
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const padding = (dataMax - dataMin) * 0.1 || 1;

  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={data.length > 15 ? Math.floor(data.length / 15) : 0}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={80}
            color="#9CA3AF"
            domain={[dataMin - padding, dataMax + padding]}
            tickFormatter={(value) => formatCompactNumber(value as number)}
          />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip lines={lines} />}
          />
          {lines.map((line) => (
            <Line
              key={line.key}
              dataKey={line.key}
              type="monotone"
              stroke={`var(--color-${line.key})`}
              strokeWidth={2.5}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
