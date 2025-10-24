export interface PodcastEntry {
  'im:name': { label: string };
  'im:image': Array<{ label: string; attributes: { height: string } }>;
  summary: { label: string };
  'im:price': {
    label: string;
    attributes: { amount: string; currency: string };
  };
  'im:contentType': {
    attributes: { term: string; label: string };
  };
  rights?: { label: string };
  title: { label: string };
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  id: {
    label: string;
    attributes: { 'im:id': string };
  };
  'im:artist': {
    label: string;
    attributes?: { href: string };
  };
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  'im:releaseDate': { label: string; attributes: { label: string } };
}

export interface PodcastFeed {
  feed: {
    author: { name: { label: string }; uri: { label: string } };
    entry: PodcastEntry[];
    updated: { label: string };
    rights: { label: string };
    title: { label: string };
    icon: { label: string };
    link: Array<{
      attributes: { rel: string; type?: string; href: string };
    }>;
    id: { label: string };
  };
}

export interface Podcast {
  id: string;
  name: string;
  artist: string;
  image: string;
  summary: string;
}

export interface Episode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl?: string;
  description?: string;
  shortDescription?: string;
  previewUrl?: string;
  artworkUrl160?: string;
  artworkUrl60?: string;
}

export interface PodcastDetail {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  feedUrl?: string;
  releaseDate: string;
  trackCount?: number;
}

export interface LookupResponse {
  resultCount: number;
  results: Array<PodcastDetail | Episode>;
}

export interface CachedData<T> {
  data: T;
  timestamp: number;
}
