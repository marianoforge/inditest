import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className={styles.container}>
      <audio controls className={styles.audio} aria-label={`Play ${title}`}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
