import type {
  PodcastFeed,
  Podcast,
  LookupResponse,
  PodcastDetail,
  Episode,
} from '@/types/podcast.types';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const TOP_PODCASTS_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const buildLookupUrl = (podcastId: string) =>
  `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

async function fetchWithProxy<T>(url: string): Promise<T> {
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.contents);
}

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

export const podcastsService = {
  async getTopPodcasts(): Promise<Podcast[]> {
    const data = await fetchWithProxy<PodcastFeed>(TOP_PODCASTS_URL);
    return data.feed.entry.map(transformPodcastEntry);
  },

  async getPodcastDetail(podcastId: string): Promise<{
    podcast: PodcastDetail;
    episodes: Episode[];
  }> {
    const url = buildLookupUrl(podcastId);
    const data = await fetchWithProxy<LookupResponse>(url);

    const podcast = data.results[0] as PodcastDetail;
    const episodes = data.results.slice(1) as Episode[];

    return {
      podcast,
      episodes,
    };
  },
};
