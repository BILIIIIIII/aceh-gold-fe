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
import { formatYAxisLabel } from "@/shared/utils/helper";
import { Gold } from "../../types/gold";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface MainChartProps {
  data: Gold[];
  selectedYear: string | null;
}

export function MainChart({ data, selectedYear }: MainChartProps) {
  const isMobile = useIsMobile();
  const lastFormattedTickRef = React.useRef<{ month?: number; year?: number }>(
    {}
  );

  const formatXAxisTick = (time: string, index: number) => {
    if (index === 0) {
      lastFormattedTickRef.current = {};
    }

    const [month, day, year] = time.split("/");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    const isMulti = isMultiYearData(data);
    if (selectedYear === null || isMulti) {
      const currentYear = date.getFullYear();
      if (currentYear !== lastFormattedTickRef.current.year) {
        lastFormattedTickRef.current.year = currentYear;
        return currentYear.toString();
      }
      return "";
    }

    const currentMonth = date.getMonth();
    if (currentMonth !== lastFormattedTickRef.current.month) {
      lastFormattedTickRef.current.month = currentMonth;
      return date.toLocaleString("default", { month: "short" });
    }
    return "";
  };

  // --------- Tick Logic ---------
  let tickFontSize = 12;
  let tickAngle = 0;
  let tickTextAnchor: "start" | "middle" | "end" = "middle";
  let tickIndexes: number[] = [];

  const isMulti = isMultiYearData(data);

  if (isMobile) {
    if (selectedYear === null || isMulti) {
      tickFontSize = 10;
      tickAngle = 0;
      tickTextAnchor = "middle";

      const firstYear =
        data.length > 0 ? new Date(data[0].time).getFullYear() : 0;
      const lastYear =
        data.length > 0
          ? new Date(data[data.length - 1].time).getFullYear()
          : 0;
      const span = lastYear - firstYear + 1;
      const maxLabels = 4;

      const yearLabels: number[] = [firstYear];
      let step = 5;
      if (span / 5 > maxLabels) {
        step = Math.ceil(span / (maxLabels - 1));
        if (step > 1 && step <= 5) step = 5;
        else if (step > 5 && step <= 10) step = 10;
        else if (step > 10) step = Math.ceil(step / 10) * 10;
      }

      let y = firstYear + step;
      while (y <= lastYear && yearLabels.length < maxLabels) {
        yearLabels.push(y);
        y += step;
      }
      if (lastYear !== yearLabels[yearLabels.length - 1]) {
        yearLabels.push(lastYear);
      }

      tickIndexes = yearLabels.map((targetYear) => {
        const exactIndex = data.findIndex(
          (item) => new Date(item.time).getFullYear() === targetYear
        );
        if (exactIndex !== -1) return exactIndex;
        return data.reduce((prevIdx, curr, idx) => {
          const prevYear = new Date(data[prevIdx].time).getFullYear();
          const currYear = new Date(curr.time).getFullYear();
          return Math.abs(currYear - targetYear) <
            Math.abs(prevYear - targetYear)
            ? idx
            : prevIdx;
        }, 0);
      });
    } else {
      tickFontSize = 10;
      tickAngle = 0;
      tickTextAnchor = "middle";

      let lastMonth = -1;
      data.forEach((item, idx) => {
        const month = new Date(item.time).getMonth();
        if (month !== lastMonth) {
          tickIndexes.push(idx);
          lastMonth = month;
        }
      });
    }
  } else {
    if (selectedYear === null || isMulti) {
      tickFontSize = 10;
      tickAngle = -45;
      tickTextAnchor = "end";

      let lastYear = -1;
      data.forEach((item, idx) => {
        const year = new Date(item.time).getFullYear();
        if (year !== lastYear) {
          tickIndexes.push(idx);
          lastYear = year;
        }
      });
    } else {
      tickFontSize = 12;
      tickAngle = 0;
      tickTextAnchor = "middle";

      tickIndexes = []; // let Recharts handle via default preserveStartEnd
    }
  }

  // Now convert tickIndexes to data values (time strings)
  const tickValues = tickIndexes.map((i) => data[i]?.time).filter(Boolean);

  return (
    <section className="h-[500px]  mb-16 ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            tick={{ fontSize: tickFontSize }}
            angle={tickAngle}
            textAnchor={tickTextAnchor}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatXAxisTick}
            ticks={tickValues}
            interval={0}
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
            stackId="a"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

function isMultiYearData(data: Gold[]): boolean {
  return (
    data.length > 0 &&
    new Date(data[0].time).getFullYear() !==
      new Date(data[data.length - 1].time).getFullYear()
  );
}

export default MainChart;
