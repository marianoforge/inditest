import { useMemo } from 'react';
import { useFilter } from '@/context/FilterContext';
import type { Podcast } from '@/types/podcast.types';

export function useFilteredPodcasts(podcasts: Podcast[] | undefined) {
  const { filter } = useFilter();

  return useMemo(() => {
    if (!podcasts) return [];
    if (!filter.trim()) return podcasts;

    const searchTerm = filter.toLowerCase().trim();

    return podcasts.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(searchTerm) ||
        podcast.artist.toLowerCase().includes(searchTerm)
    );
  }, [podcasts, filter]);
}

