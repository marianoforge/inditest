'use client';

import { usePodcasts, useFilteredPodcasts } from '@/hooks';
import { LoadingSpinner, PageHeader } from '@/components/ui';
import { PodcastGrid } from '@/components/podcast';

export default function Home() {
  const { data: podcasts, isLoading } = usePodcasts();
  const filteredPodcasts = useFilteredPodcasts(podcasts);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <PageHeader resultsCount={filteredPodcasts.length} />
      <main>
        <PodcastGrid podcasts={filteredPodcasts} />
      </main>
    </>
  );
}
