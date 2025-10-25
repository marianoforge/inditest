import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  showLoading?: boolean;
}

export function Header({ showLoading }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Podcaster
        </Link>
        {showLoading && <div className={styles.loadingIndicator} />}
      </nav>
    </header>
  );
}
