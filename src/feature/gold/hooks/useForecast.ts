"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getForecasts } from "../api/getForecast";
import { ForecastApiResponse } from "../types/forecast";

const useForecasts = (mayam: number = 3.3) => {
  const {
    data: forecastsResponse,
    isError,
    error,
  } = useSuspenseQuery<ForecastApiResponse>({
    queryKey: ["Forecasts"],
    queryFn: getForecasts,
    staleTime: 5 * 60 * 1000,
  });

  const processedData = useMemo(() => {
    const rawData = forecastsResponse?.data || [];

    const chartData = rawData.map((item) => ({
      date: item.time,
      xgboost: item.forecasts.xgboost * mayam,
      lightgbm: item.forecasts.lightgbm * mayam,
      catboost: item.forecasts.catboost * mayam,
    }));

    const sortedChartData = [...chartData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      forecastChartData: sortedChartData,
    };
  }, [forecastsResponse?.data, mayam]);

  return {
    ...processedData,
    isError,
    error,
  };
};

export default useForecasts;
