type AllowedMethods = "get" | "post" | "put" | "delete";

export interface UseFetchOptions {
  useInitialFetch?: boolean;
  method?: AllowedMethods;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  body?: any;
}

export interface UseFetchReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  makeRequest: (
    requestOptions?: Partial<UseFetchOptions>
  ) => Promise<T | undefined>;
}

// Tipo de dato para el usuario autenticado
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
