import { useQuery } from '@tanstack/react-query';
import { podcastsService } from '@/services/api/podcasts.service';
import { localStorageService } from '@/services/cache/localStorage.service';
import type { Podcast } from '@/types/podcast.types';

const CACHE_KEY = 'top-podcasts';

export function usePodcasts() {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const cached = localStorageService.get<Podcast[]>(CACHE_KEY);
      if (cached) {
        return cached;
      }

      const podcasts = await podcastsService.getTopPodcasts();
      localStorageService.set(CACHE_KEY, podcasts);
      return podcasts;
    },
  });
}
