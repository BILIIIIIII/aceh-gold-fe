"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGolds } from "../api/getGolds";
import type { ApiResponse } from "../types/apiResponse";
import { GoldQueryParams } from "../types/goldQueryParams";
import { Gold } from "../types/gold";
import { useMemo } from "react";
import { parseIDRValue } from "../lib/utils";

const useGolds = (
  params: GoldQueryParams,
  selectedYear: string | null,
  mayam: number = 3.3
) => {
  // Using useSuspenseQuery instead of useQuery
  const {
    data: GoldsResponses,
    isError,
    error,
  } = useSuspenseQuery<ApiResponse<Gold[]>>({
    queryKey: ["Golds", params],
    queryFn: () => getGolds(params),
    // Optional: Add stale time to prevent unnecessary refetches
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Optional: Add retry configuration
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const processed = useMemo(() => {
    const rawData = (GoldsResponses?.data || []).map((item) => ({
      ...item,
      close: parseIDRValue(item.close),
      open: parseIDRValue(item.open),
    }));

    // Filter by year if selectedYear is provided
    const filtered = selectedYear
      ? rawData.filter(
          (item) =>
            new Date(item.time).getFullYear().toString() === selectedYear
        )
      : rawData;

    // Sort by date
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // Transform for chart
    const chartData = sorted.map((item) => ({
      time: item.time,
      close: item.close * mayam,
      open: item.open * mayam,
    }));

    // Calculate metrics only if we have data
    if (chartData.length === 0) {
      return {
        chartData: [],
        metrics: {
          initialPrice: 0,
          currentPrice: 0,
          highPrice: 0,
          lowPrice: 0,
          absoluteChange: 0,
          percentChange: 0,
        },
      };
    }

    const initialPrice = chartData[0]?.close ?? 0;
    const currentPrice = chartData[chartData.length - 1]?.close ?? 0;
    const highPrice = Math.max(...chartData.map((i) => i.close));
    const lowPrice = Math.min(...chartData.map((i) => i.close));
    const absoluteChange = currentPrice - initialPrice;
    const percentChange =
      initialPrice !== 0
        ? (absoluteChange / initialPrice) * 100
        : currentPrice !== 0
        ? 100
        : 0;

    return {
      chartData,
      metrics: {
        initialPrice,
        currentPrice,
        highPrice,
        lowPrice,
        absoluteChange,
        percentChange,
      },
    };
  }, [GoldsResponses?.data, selectedYear, mayam]);

  return {
    chartData: processed.chartData,
    metrics: processed.metrics,
    isError,
    error,
    // Note: useSuspenseQuery doesn't provide isPending/isLoading as it suspends instead
  };
};

export default useGolds;
