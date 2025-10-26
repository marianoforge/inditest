import { fetchPodcastDetail } from '@/services/api/podcasts.server';
import { PodcastSidebar, AudioPlayer } from '@/components/podcast';
import styles from './page.module.css';

interface EpisodeDetailPageProps {
  params: Promise<{ podcastId: string; episodeId: string }>;
}

export default async function EpisodeDetailPage({
  params,
}: EpisodeDetailPageProps) {
  const { podcastId, episodeId } = await params;
  const { podcast, episodes } = await fetchPodcastDetail(podcastId);

  const episode = episodes.find((ep) => ep.trackId.toString() === episodeId);

  if (!episode) {
    return <div>Episode not found</div>;
  }

  const description =
    episode.description ||
    episode.shortDescription ||
    'No description available';

  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <PodcastSidebar podcast={podcast} podcastId={podcastId} />
      </div>
      <div className={styles.content}>
        <div className={styles.episode}>
          <h1 className={styles.title}>{episode.trackName}</h1>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {episode.episodeUrl && (
            <AudioPlayer src={episode.episodeUrl} title={episode.trackName} />
          )}
        </div>
      </div>
    </main>
  );
}
