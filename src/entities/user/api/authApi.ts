import apiClient from "@/shared/lib/api/client";
import {
  LoginCredentials,
  AuthResponse,
  RefreshTokenResponse,
} from "../model/types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  refresh: async (
    refreshToken: string,
    expiresInMins?: number
  ): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      "/auth/refresh",
      {
        refreshToken,
        expiresInMins,
      }
    );
    return response.data;
  },

  getMe: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>("/auth/me");
    return response.data;
  },
};
