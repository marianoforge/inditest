import type {
  PodcastFeed,
  Podcast,
  LookupResponse,
  PodcastDetail,
  Episode,
} from '@/types/podcast.types';

const TOP_PODCASTS_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const buildLookupUrl = (podcastId: string) =>
  `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

function transformPodcastEntry(
  entry: PodcastFeed['feed']['entry'][0]
): Podcast {
  return {
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    artist: entry['im:artist'].label,
    image: entry['im:image'][2]?.label || entry['im:image'][0]?.label || '',
    summary: entry.summary.label,
  };
}

export async function fetchTopPodcasts(): Promise<Podcast[]> {
  const response = await fetch(TOP_PODCASTS_URL, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch podcasts: ${response.status}`);
  }

  const data: PodcastFeed = await response.json();
  return data.feed.entry.map(transformPodcastEntry);
}

export async function fetchPodcastDetail(podcastId: string): Promise<{
  podcast: PodcastDetail;
  episodes: Episode[];
}> {
  const url = buildLookupUrl(podcastId);
  const response = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch podcast detail: ${response.status}`);
  }

  const data: LookupResponse = await response.json();

  if (data.resultCount === 0) {
    throw new Error('Podcast not found');
  }

  const podcast = data.results[0] as PodcastDetail;
  const episodes = data.results.slice(1) as Episode[];

  return {
    podcast,
    episodes,
  };
}
