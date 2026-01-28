import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "@/shared/types";
import { useAuthStore } from "@/entities/user/model/authStore";

const BASE_URL = "https://dummyjson.com";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshInFlight: Promise<void> | null = null;

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isAuthEndpoint =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/refresh");

    if (!isAuthEndpoint && typeof window !== "undefined") {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const accessToken = parsed.state?.accessToken;
          if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch {
          // Ignore parsing errors
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Попытка авто-refresh при 401 (один раз на запрос) и повтор запроса.
    // Важно: не делаем refresh для эндпоинтов /auth/login и /auth/refresh.
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (
      !isAuthEndpoint &&
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshInFlight) {
          refreshInFlight = useAuthStore.getState().refresh();
        }
        await refreshInFlight;
      } catch {
        useAuthStore.getState().logout();
        refreshInFlight = null;
        return Promise.reject({
          message: "Session expired. Please login again.",
          status: 401,
        } satisfies ApiError);
      } finally {
        refreshInFlight = null;
      }

      return apiClient(originalRequest);
    }

    const apiError: ApiError = {
      message: error.message || "An error occurred while executing the request",
      status: error.response?.status,
    };

    // Дальше — только обработка HTTP-статусов.
    if (error.response) {
      const errorData = error.response.data as { message?: string } | undefined;

      if (error.response.status === 400) {
        apiError.message = errorData?.message || "Invalid request data";
      } else if (error.response.status === 401) {
        apiError.message = "Invalid credentials";
      } else if (error.response.status === 404) {
        apiError.message = "Resource not found";
      } else if (error.response.status === 500) {
        apiError.message = "Server error. Please try again later.";
      } else {
        apiError.message =
          errorData?.message || `Error ${error.response.status}: ${error.message}`;
      }
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
