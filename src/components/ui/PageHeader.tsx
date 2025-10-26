import { SearchInput } from './SearchInput';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  resultsCount?: number;
}

export function PageHeader({ resultsCount }: PageHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SearchInput resultsCount={resultsCount} />
      </div>
    </div>
  );
}
