import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount?: number;
}

export function SearchInput({
  value,
  onChange,
  resultsCount,
}: SearchInputProps) {
  return (
    <div className={styles.wrapper}>
      {resultsCount !== undefined && (
        <span className={styles.badge}>{resultsCount}</span>
      )}
      <input
        type="search"
        placeholder="Filter podcasts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        aria-label="Filter podcasts by title or author"
      />
    </div>
  );
}

