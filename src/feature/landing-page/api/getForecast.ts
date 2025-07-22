import { api } from "@/shared/utils/api";
import { ForecastApiResponse } from "../types/forecast";

export async function getForecasts() {
  // Kita asumsikan endpoint-nya /forecasts dan tidak butuh parameter
  return await api.get<ForecastApiResponse>("/forecast");
}
