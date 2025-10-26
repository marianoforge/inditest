'use client';

import { use } from 'react';
import { usePodcastDetail, usePodcasts } from '@/hooks';
import { LoadingSpinner } from '@/components/ui';
import { PodcastSidebar, EpisodesTable } from '@/components/podcast';
import styles from './page.module.css';

export default function PodcastDetailPage({
  params,
}: {
  params: Promise<{ podcastId: string }>;
}) {
  const { podcastId } = use(params);
  const { data: podcastsData } = usePodcasts();
  const { data: detailData, isLoading } = usePodcastDetail(podcastId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!detailData) {
    return <div>Podcast not found</div>;
  }

  const podcast =
    podcastsData?.find((p) => p.id === podcastId) || detailData.podcast;

  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <PodcastSidebar podcast={podcast} podcastId={podcastId} />
      </div>
      <div className={styles.content}>
        <EpisodesTable episodes={detailData.episodes} podcastId={podcastId} />
      </div>
    </main>
  );
}
