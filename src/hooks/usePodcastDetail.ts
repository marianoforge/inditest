import { useQuery } from '@tanstack/react-query';
import { podcastsService } from '@/services/api/podcasts.service';
import { localStorageService } from '@/services/cache/localStorage.service';

export function usePodcastDetail(podcastId: string) {
  return useQuery({
    queryKey: ['podcast', podcastId],
    queryFn: async () => {
      const cacheKey = `podcast-${podcastId}`;
      const cached = localStorageService.get<{
        podcast: unknown;
        episodes: unknown[];
      }>(cacheKey);

      if (cached) {
        return cached;
      }

      const data = await podcastsService.getPodcastDetail(podcastId);
      localStorageService.set(cacheKey, data);
      return data;
    },
    enabled: !!podcastId,
  });
}
