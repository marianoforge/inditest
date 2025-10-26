import { describe, it, expect } from 'vitest';
import { filterPodcasts } from '@/utils/filtering';
import type { Podcast } from '@/types/podcast.types';

const mockPodcasts: Podcast[] = [
  {
    id: '1',
    name: 'Song Exploder',
    artist: 'Hrishikesh Hirway',
    image: 'https://example.com/1.jpg',
    summary: 'A podcast about music',
  },
  {
    id: '2',
    name: 'The Joe Budden Podcast',
    artist: 'The Joe Budden Network',
    image: 'https://example.com/2.jpg',
    summary: 'Entertainment podcast',
  },
  {
    id: '3',
    name: 'All Songs Considered',
    artist: 'NPR',
    image: 'https://example.com/3.jpg',
    summary: 'Music discovery',
  },
];

describe('filterPodcasts', () => {
  it('returns all podcasts when search is empty', () => {
    expect(filterPodcasts(mockPodcasts, '')).toEqual(mockPodcasts);
    expect(filterPodcasts(mockPodcasts, '   ')).toEqual(mockPodcasts);
  });

  it('filters by podcast name', () => {
    const result = filterPodcasts(mockPodcasts, 'song');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Song Exploder');
    expect(result[1].name).toBe('All Songs Considered');
  });

  it('filters by artist name', () => {
    const result = filterPodcasts(mockPodcasts, 'NPR');
    expect(result).toHaveLength(1);
    expect(result[0].artist).toBe('NPR');
  });

  it('is case insensitive', () => {
    expect(filterPodcasts(mockPodcasts, 'SONG')).toHaveLength(2);
    expect(filterPodcasts(mockPodcasts, 'npr')).toHaveLength(1);
  });

  it('trims whitespace', () => {
    const result = filterPodcasts(mockPodcasts, '  joe  ');
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain('Joe');
  });

  it('returns empty array when no matches', () => {
    expect(filterPodcasts(mockPodcasts, 'xyz123')).toEqual([]);
  });
});
