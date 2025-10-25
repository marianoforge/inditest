import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} role="status" aria-label="Loading">
        <span className={styles.srOnly}>Loading...</span>
      </div>
    </div>
  );
}
