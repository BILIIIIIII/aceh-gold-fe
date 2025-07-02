import { ApiClient } from "../libs/apiClient";

// 1. Ambil URL dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 2. Kasih peringatan kalau URL-nya kosong, biar gampang di-debug
if (!API_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_URL environment variable. Please set it in your .env.local file."
  );
}

// 3. Buat instance ApiClient dengan URL yang dinamis
export const api = new ApiClient(API_URL, {});
