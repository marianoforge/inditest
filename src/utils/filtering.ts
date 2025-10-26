import type { Podcast } from '@/types/podcast.types';

export function filterPodcasts(
  podcasts: Podcast[],
  searchTerm: string
): Podcast[] {
  if (!searchTerm.trim()) return podcasts;

  const term = searchTerm.toLowerCase().trim();

  return podcasts.filter(
    (podcast) =>
      podcast.name.toLowerCase().includes(term) ||
      podcast.artist.toLowerCase().includes(term)
  );
}
