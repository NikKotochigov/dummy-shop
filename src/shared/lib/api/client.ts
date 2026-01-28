import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/shared/types";

// Базовый URL для DummyJSON API
const BASE_URL = "https://dummyjson.com";

// Создаем экземпляр axios
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - добавляем JWT токен к запросам
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - обрабатываем ошибки
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || "Произошла ошибка при выполнении запроса",
      status: error.response?.status,
    };

    if (error.response?.status === 401) {
      apiError.message = "Неверные учетные данные";
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else if (error.response?.status === 404) {
      apiError.message = "Ресурс не найден";
    } else if (error.response?.status === 500) {
      apiError.message = "Ошибка сервера";
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
