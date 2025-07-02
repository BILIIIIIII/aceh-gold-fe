import { Gold } from "../types/gold";
import { api } from "@/shared/utils/api";
import { ApiResponse } from "../types/apiResponse";
import { GoldQueryParams } from "../types/goldQueryParams";

export async function getGolds(params: GoldQueryParams) {
  return await api.get<ApiResponse<Gold[]>>("/gold_prices", {
    params: params as Record<string, string>,
  });
}
