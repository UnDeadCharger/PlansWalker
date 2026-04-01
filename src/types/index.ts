// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Generic async state shape — reuse in every RTK slice
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
