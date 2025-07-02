import { ApiClient } from "../libs/apiClient";

export const api = new ApiClient("http://127.0.0.1:8000", {});

export const apiRealestica = new ApiClient(
  "https://realesticebe-production.up.railway.app",
  {}
);
