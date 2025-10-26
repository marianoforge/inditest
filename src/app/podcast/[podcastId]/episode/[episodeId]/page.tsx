'use client';

import { use } from 'react';
import { usePodcastDetail, usePodcasts } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';
import { PodcastSidebar, AudioPlayer } from '@/components/podcast';
import styles from './page.module.css';

export default function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ podcastId: string; episodeId: string }>;
}) {
  const { podcastId, episodeId } = use(params);
  const { data: podcastsData } = usePodcasts();
  const { data: detailData, isLoading } = usePodcastDetail(podcastId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!detailData) {
    return <div>Episode not found</div>;
  }

  const episode = detailData.episodes.find(
    (ep) => ep.trackId.toString() === episodeId
  );

  if (!episode) {
    return <div>Episode not found</div>;
  }

  const podcast =
    podcastsData?.find((p) => p.id === podcastId) || detailData.podcast;

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
