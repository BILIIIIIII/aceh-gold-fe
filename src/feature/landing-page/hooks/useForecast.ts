// hooks/useForecast.ts

"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getForecasts } from "../api/getForecast";
import { ForecastApiResponse, ForecastItem } from "../types/forecast";

// Definisikan konstanta mayam di sini atau di file config
const CITY_MAYAM = {
  banda_aceh: 3.3,
  langsa: 3.29,
  lhokseumawe: 3.0,
};

// Tipe data baru untuk output hook
export interface CityForecastData {
  [key: string]: string | number; // <-- TAMBAHKAN BARIS INI
  date: string;
  banda_aceh: number;
  langsa: number;
  lhokseumawe: number;
}

const useForecasts = () => {
  const {
    data: forecastsResponse,
    isError,
    error,
  } = useSuspenseQuery<ForecastApiResponse>({
    queryKey: ["Forecasts"],
    queryFn: getForecasts,
    staleTime: 5 * 60 * 1000,
  });

  const forecastsByModel = useMemo(() => {
    const rawData = forecastsResponse?.data || [];
    if (rawData.length === 0) {
      return {
        xgboost: [],
        lightgbm: [],
        catboost: [],
      };
    }

    // Fungsi untuk memproses data mentah menjadi data per kota
    const processModelData = (
      model: "xgboost" | "lightgbm" | "catboost"
    ): CityForecastData[] => {
      return rawData
        .map((item: ForecastItem) => ({
          date: item.time,
          banda_aceh: item.forecasts[model] * CITY_MAYAM.banda_aceh,
          langsa: item.forecasts[model] * CITY_MAYAM.langsa,
          lhokseumawe: item.forecasts[model] * CITY_MAYAM.lhokseumawe,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    };

    return {
      xgboost: processModelData("xgboost"),
      lightgbm: processModelData("lightgbm"),
      catboost: processModelData("catboost"),
    };
  }, [forecastsResponse?.data]);

  return {
    forecastsByModel, // Mengembalikan data yang sudah dikelompokkan per model
    isError,
    error,
  };
};

export default useForecasts;
