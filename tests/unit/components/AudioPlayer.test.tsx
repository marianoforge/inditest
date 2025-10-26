import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AudioPlayer } from '@/components/podcast/AudioPlayer';

describe('AudioPlayer', () => {
  it('renders audio element with controls', () => {
    render(
      <AudioPlayer src="https://example.com/audio.mp3" title="Test Episode" />
    );

    const audio = screen.getByLabelText('Play Test Episode');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
  });

  it('renders audio source with correct src', () => {
    const { container } = render(
      <AudioPlayer src="https://example.com/audio.mp3" title="Test" />
    );

    const source = container.querySelector('source');
    expect(source).toHaveAttribute('src', 'https://example.com/audio.mp3');
    expect(source).toHaveAttribute('type', 'audio/mpeg');
  });
});
