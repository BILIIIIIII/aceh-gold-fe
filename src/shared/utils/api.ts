import { ApiClient } from "../libs/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_URL environment variable. Please set it in your .env.local file."
  );
}

export const api = new ApiClient(API_URL, {});
