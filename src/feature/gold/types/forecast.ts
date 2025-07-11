import { ApiResponse } from "./apiResponse";

export interface ForecastModels {
  xgboost: number;
  lightgbm: number;
  catboost: number;
}

export interface ForecastItem {
  time: string;
  forecasts: ForecastModels;
}

export type ForecastApiResponse = ApiResponse<ForecastItem[]>;
