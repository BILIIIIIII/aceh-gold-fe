"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getGolds } from "../api/getGolds";
import type { ApiResponse } from "../types/apiResponse";
import { GoldQueryParams } from "../types/goldQueryParams";
import { Gold } from "../types/gold";
import { useMemo } from "react";
import { parseIDRValue } from "@/shared/utils/helper";

const useGolds = (
  params: GoldQueryParams,
  selectedYear: string | null,
  mayam: number = 3.3
) => {
  const {
    data: GoldsResponses,
    isError,
    error,
  } = useSuspenseQuery<ApiResponse<Gold[]>>({
    queryKey: ["Golds", params],
    queryFn: () => getGolds(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const processed = useMemo(() => {
    const rawData = (GoldsResponses?.data || []).map((item) => ({
      ...item,
      close: parseIDRValue(item.close),
      open: parseIDRValue(item.open),
    }));

    // --- PERBAIKAN DI SINI ---
    // Hitung semua tahun yang tersedia dari rawData (data mentah, sebelum filter tahun)
    const allPossibleYearsSet = new Set<string>();
    rawData.forEach((item) => {
      const year = new Date(item.time).getFullYear().toString();
      allPossibleYearsSet.add(year);
    });
    const allPossibleYears = Array.from(allPossibleYearsSet).sort(
      (a, b) => parseInt(b) - parseInt(a)
    ); // Urutkan dari terbaru ke terlama
    // --- END PERBAIKAN ---

    const filtered = selectedYear // Filter data berdasarkan selectedYear
      ? rawData.filter(
          (item) =>
            new Date(item.time).getFullYear().toString() === selectedYear
        )
      : rawData; // Jika selectedYear null, gunakan semua data

    const sorted = [...filtered].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    const chartData = sorted.map((item) => ({
      time: item.time,
      close: item.close * mayam,
      open: item.open * mayam,
    }));

    // console.log(chartData); // Log ini sekarang akan menunjukkan data yang difilter

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
        allYears: allPossibleYears, // Sertakan allPossibleYears di sini
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
      allYears: allPossibleYears, // Sertakan allPossibleYears di sini
    };
  }, [GoldsResponses?.data, selectedYear, mayam]);

  return {
    chartData: processed.chartData,
    metrics: processed.metrics,
    allYears: processed.allYears, // Ekspor allYears dari hook
    isError,
    error,
  };
};

export default useGolds;
