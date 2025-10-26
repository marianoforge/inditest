import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PodcastCard } from '@/components/podcast/PodcastCard';
import type { Podcast } from '@/types/podcast.types';

const mockPodcast: Podcast = {
  id: '123',
  name: 'Test Podcast',
  artist: 'Test Artist',
  image: 'https://example.com/image.jpg',
  summary: 'A test podcast',
};

describe('PodcastCard', () => {
  it('renders podcast name in uppercase', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    expect(screen.getByText('TEST PODCAST')).toBeInTheDocument();
  });

  it('renders artist with "Author:" prefix', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    expect(screen.getByText('Author: Test Artist')).toBeInTheDocument();
  });

  it('links to podcast detail page', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/podcast/123');
  });

  it('renders image with alt text', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    const image = screen.getByAltText('Test Podcast');
    expect(image).toBeInTheDocument();
  });
});
