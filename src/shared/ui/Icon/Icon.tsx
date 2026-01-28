import type { ComponentPropsWithoutRef } from "react";
import styles from "./Icon.module.scss";

export type IconName = "phone" | "email" | "location" | "user";

type Props = {
  name: IconName;
  size?: number;
} & Omit<ComponentPropsWithoutRef<"svg">, "children">;

export const Icon = ({ name, size = 14, className, ...props }: Props) => {
  const cn = [styles.icon, className].filter(Boolean).join(" ");

  switch (name) {
    case "phone":
      return (
        <svg
          className={cn}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          {...props}
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
        </svg>
      );
    case "email":
      return (
        <svg
          className={cn}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          {...props}
        >
          <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
        </svg>
      );
    case "location":
      return (
        <svg
          className={cn}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          {...props}
        >
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
        </svg>
      );
    case "user":
      return (
        <svg
          className={cn}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          {...props}
        >
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
        </svg>
      );
    default:
      return null;
  }
};

