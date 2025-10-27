import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
