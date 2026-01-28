"use client";

import { useAuthStore } from "@/entities/user/model/authStore";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.year}>{currentYear}</span>
        {isAuthenticated && user && (
          <span className={styles.userInfo}>Logged as {user.email}</span>
        )}
      </div>
    </footer>
  );
};
