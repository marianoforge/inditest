import Image from 'next/image';
import { NavLink } from '@/components/ui';
import type { Podcast } from '@/types/podcast.types';
import styles from './PodcastCard.module.css';

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <NavLink href={`/podcast/${podcast.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={podcast.image}
          alt={podcast.name}
          width={120}
          height={120}
          className={styles.image}
        />
      </div>
      <h2 className={styles.name}>{podcast.name.toUpperCase()}</h2>
      <p className={styles.author}>Author: {podcast.artist}</p>
    </NavLink>
  );
}
