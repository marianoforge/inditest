import { useFilter } from '@/context/FilterContext';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  resultsCount?: number;
}

export function SearchInput({ resultsCount }: SearchInputProps) {
  const { filter, setFilter } = useFilter();

  return (
    <div className={styles.wrapper}>
      {resultsCount !== undefined && (
        <span className={styles.badge}>{resultsCount}</span>
      )}
      <input
        type="search"
        placeholder="Filter podcasts..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.input}
        aria-label="Filter podcasts by title or author"
      />
    </div>
  );
}
