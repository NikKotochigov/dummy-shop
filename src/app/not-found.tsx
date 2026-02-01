import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorBlock}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.divider}></div>
          <p className={styles.message}>This page could not be found.</p>
        </div>
        <Link href="/" className={styles.homeLink}>
          Go back home
        </Link>
      </div>
    </div>
  );
}
