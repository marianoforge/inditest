import Link from 'next/link';
import type { Episode } from '@/types/podcast.types';
import styles from './EpisodesTable.module.css';

interface EpisodesTableProps {
  episodes: Episode[];
  podcastId: string;
}

function formatDuration(milliseconds: number | undefined): string {
  if (!milliseconds || isNaN(milliseconds)) {
    return '--:--';
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function EpisodesTable({ episodes, podcastId }: EpisodesTableProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Episodes: {episodes.length}</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Title</th>
              <th className={styles.headerCell}>Date</th>
              <th className={styles.headerCell}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.trackId} className={styles.row}>
                <td className={styles.cell}>
                  <Link
                    href={`/podcast/${podcastId}/episode/${episode.trackId}`}
                    className={styles.link}
                  >
                    {episode.trackName}
                  </Link>
                </td>
                <td className={styles.cell}>
                  {formatDate(episode.releaseDate)}
                </td>
                <td className={styles.cell}>
                  {formatDuration(episode.trackTimeMillis)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
