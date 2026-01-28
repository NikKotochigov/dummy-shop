import { LoginCredentials } from "@/entities/user/model/types";

export interface ValidationErrors {
  username?: string;
  password?: string;
}

export const validateUsername = (username: string): string | null => {
  if (!username || username.trim() === "") {
    return "Username is required";
  }
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === "") {
    return "Password is required";
  }
  if (password.length < 3) {
    return "Password must be at least 3 characters";
  }
  return null;
};

export const validateLoginForm = (
  credentials: LoginCredentials
): ValidationErrors => {
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
