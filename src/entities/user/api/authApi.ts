import apiClient from "@/shared/lib/api/client";
import { LoginCredentials, AuthResponse } from "../model/types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },
};
