import { fetchTopPodcasts } from '@/services/api/podcasts.server';
import { PodcastGridClient } from '@/components/podcast/PodcastGridClient';

export default async function Home() {
  const podcasts = await fetchTopPodcasts();

  return (
    <main>
      <PodcastGridClient podcasts={podcasts} />
    </main>
  );
}
