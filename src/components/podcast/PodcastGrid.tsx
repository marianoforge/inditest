import type { Podcast } from '@/types/podcast.types';
import { PodcastCard } from './PodcastCard';
import styles from './PodcastGrid.module.css';

interface PodcastGridProps {
  podcasts: Podcast[];
}

export function PodcastGrid({ podcasts }: PodcastGridProps) {
  return (
    <div className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
