'use client';

import { useState, useMemo } from 'react';
import type { Podcast } from '@/types/podcast.types';
import { PodcastCard } from './PodcastCard';
import { SearchInput } from './SearchInput';
import styles from './PodcastGrid.module.css';

interface PodcastGridClientProps {
  podcasts: Podcast[];
}

export function PodcastGridClient({ podcasts }: PodcastGridClientProps) {
  const [filter, setFilter] = useState('');

  const filteredPodcasts = useMemo(() => {
    if (!filter.trim()) return podcasts;

    const searchTerm = filter.toLowerCase().trim();

    return podcasts.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(searchTerm) ||
        podcast.artist.toLowerCase().includes(searchTerm)
    );
  }, [podcasts, filter]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <SearchInput
            value={filter}
            onChange={setFilter}
            resultsCount={filteredPodcasts.length}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </>
  );
}
