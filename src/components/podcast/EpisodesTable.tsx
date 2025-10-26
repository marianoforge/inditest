import { NavLink } from '@/components/ui';
import type { Episode } from '@/types/podcast.types';
import { formatDuration, formatDate } from '@/utils/formatters';
import styles from './EpisodesTable.module.css';

interface EpisodesTableProps {
  episodes: Episode[];
  podcastId: string;
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
                  <NavLink
                    href={`/podcast/${podcastId}/episode/${episode.trackId}`}
                    className={styles.link}
                  >
                    {episode.trackName}
                  </NavLink>
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
