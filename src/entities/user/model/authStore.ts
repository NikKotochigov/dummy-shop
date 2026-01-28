import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials, AuthResponse } from "./types";
import { authApi } from "../api/authApi";
import { ApiError } from "@/shared/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response: AuthResponse = await authApi.login(credentials);
          set({
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              gender: response.gender,
              image: response.image,
            },
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || "Ошибка при авторизации",
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: () => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const userStr = localStorage.getItem("user");
          if (token && userStr) {
            try {
              const user = JSON.parse(userStr);
              set({
                user,
                token,
                isAuthenticated: true,
              });
            } catch {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
              });
            }
          }
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
