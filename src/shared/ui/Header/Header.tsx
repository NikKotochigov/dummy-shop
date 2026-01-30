"use client";

import Link from "next/link";
import { useAuthStore } from "@/entities/user/model/authStore";
import { Icon } from "@/shared/ui/Icon";
import styles from "./Header.module.scss";

const CONTACTS = [
  { type: "phone", label: "+021-95-51-84" },
  { type: "email", label: "shop@abelohost.com" },
  { type: "location", label: "1734 Stonecoal Road" },
] as const;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/hot-deals", label: "Hot Deals" },
  { href: "/categories", label: "Categories" },
  { href: "/laptops", label: "Laptops" },
  { href: "/smartphones", label: "Smartphones" },
  { href: "/cameras", label: "Cameras" },
  { href: "/accessories", label: "Accessories" },
] as const;

export const Header = () => {
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.contacts}>
          {CONTACTS.map((item) => (
            <span key={item.type} className={styles.contactItem}>
              <Icon name={item.type} className={styles.icon} />
              {item.label}
            </span>
          ))}
        </div>
        <div className={styles.authSection}>
          {isAuthenticated && user ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              <Icon name="user" className={styles.icon} />
              Login
            </Link>
          )}
        </div>
      </div>

      <div className={styles.middleBar}>
        <div className={styles.logo}>
          Abelohost Shop<span className={styles.redDot}>.</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>

    </header>
  );
};
