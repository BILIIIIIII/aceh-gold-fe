export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  meta?: {
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  };
  error: Record<string, string> | null;
}
