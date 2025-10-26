import { fetchPodcastDetail } from '@/services/api/podcasts.server';
import { PodcastSidebar, EpisodesTable } from '@/components/podcast';
import styles from './page.module.css';

interface PodcastDetailPageProps {
  params: Promise<{ podcastId: string }>;
}

export default async function PodcastDetailPage({
  params,
}: PodcastDetailPageProps) {
  const { podcastId } = await params;
  const { podcast, episodes } = await fetchPodcastDetail(podcastId);

  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <PodcastSidebar podcast={podcast} podcastId={podcastId} />
      </div>
      <div className={styles.content}>
        <EpisodesTable episodes={episodes} podcastId={podcastId} />
      </div>
    </main>
  );
}
