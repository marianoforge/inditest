'use client';

import { usePodcasts } from '@/hooks';
import { LoadingSpinner, SearchInput } from '@/components/ui';

export default function Home() {
  const { data: podcasts, isLoading } = usePodcasts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <SearchInput resultsCount={podcasts?.length} />
      <p>Podcasts loaded: {podcasts?.length || 0}</p>
    </main>
  );
}
