"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/entities/user/model/authStore";
import { LoginCredentials } from "@/entities/user/model/types";
import { validateLoginForm } from "../../lib/validation";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      await login(formData);
      router.push("/");
    } catch {
      // Ошибка обрабатывается в store
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`${styles.input} ${validationErrors.username ? styles.inputError : ""}`}
            disabled={isLoading}
            placeholder="Username"
            autoComplete="username"
          />
          {validationErrors.username && (
            <span className={styles.errorText}>
              {validationErrors.username}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${validationErrors.password ? styles.inputError : ""}`}
            disabled={isLoading}
            placeholder="Password"
            autoComplete="current-password"
          />
          {validationErrors.password && (
            <span className={styles.errorText}>
              {validationErrors.password}
            </span>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};
