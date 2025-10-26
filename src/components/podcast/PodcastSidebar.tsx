import Link from 'next/link';
import Image from 'next/image';
import type { Podcast, PodcastDetail } from '@/types/podcast.types';
import styles from './PodcastSidebar.module.css';

interface PodcastSidebarProps {
  podcast: Podcast | PodcastDetail;
  podcastId: string;
}

export function PodcastSidebar({ podcast, podcastId }: PodcastSidebarProps) {
  const image =
    'image' in podcast
      ? podcast.image
      : podcast.artworkUrl600 || podcast.artworkUrl100 || '';
  const name = 'name' in podcast ? podcast.name : podcast.collectionName;
  const artist = 'artist' in podcast ? podcast.artist : podcast.artistName;
  const description = 'summary' in podcast ? podcast.summary : '';

  return (
    <aside className={styles.sidebar}>
      <Link href={`/podcast/${podcastId}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.author}>by {artist}</p>
        </div>
      </Link>
      {description && (
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Description:</h2>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      )}
    </aside>
  );
}
