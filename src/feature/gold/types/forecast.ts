import { ApiResponse } from "./apiResponse";

// Tipe untuk model-model prediksi di dalam 'forecasts'
export interface ForecastModels {
  xgboost: number;
  lightgbm: number;
  catboost: number;
}

// Tipe untuk satu item data forecast
export interface ForecastItem {
  time: string;
  forecasts: ForecastModels;
}

// Tipe untuk keseluruhan response API forecast
export type ForecastApiResponse = ApiResponse<ForecastItem[]>;
