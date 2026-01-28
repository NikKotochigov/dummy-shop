import { LoginCredentials } from "@/entities/user/model/types";

export interface ValidationErrors {
  username?: string;
  password?: string;
}

export const validateUsername = (username: string): string | null => {
  if (!username || username.trim() === "") {
    return "Имя пользователя обязательно";
  }
  if (username.length < 3) {
    return "Имя пользователя должно содержать минимум 3 символа";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === "") {
    return "Пароль обязателен";
  }
  if (password.length < 3) {
    return "Пароль должен содержать минимум 3 символа";
  }
  return null;
};

export const validateLoginForm = (credentials: LoginCredentials): ValidationErrors => {
  const errors: ValidationErrors = {};

  const usernameError = validateUsername(credentials.username);
  if (usernameError) {
    errors.username = usernameError;
  }

  const passwordError = validatePassword(credentials.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
