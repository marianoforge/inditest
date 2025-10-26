import { describe, it, expect } from 'vitest';
import {
  formatDuration,
  formatDate,
  formatDateShort,
} from '@/utils/formatters';

describe('formatDuration', () => {
  it('formats milliseconds to MM:SS', () => {
    expect(formatDuration(125000)).toBe('2:05');
    expect(formatDuration(3661000)).toBe('61:01');
    expect(formatDuration(0)).toBe('0:00');
  });

  it('handles undefined', () => {
    expect(formatDuration(undefined)).toBe('--:--');
  });

  it('handles NaN', () => {
    expect(formatDuration(NaN)).toBe('--:--');
  });

  it('pads seconds with zero', () => {
    expect(formatDuration(60000)).toBe('1:00');
    expect(formatDuration(5000)).toBe('0:05');
  });
});

describe('formatDate', () => {
  it('formats date to MM/DD/YYYY', () => {
    expect(formatDate('2024-03-15T10:00:00Z')).toBe('03/15/2024');
    expect(formatDate('2023-12-25T00:00:00Z')).toBe('12/25/2023');
  });
});

describe('formatDateShort', () => {
  it('formats date to short format', () => {
    const result = formatDateShort('2024-03-15T10:00:00Z');
    expect(result).toContain('Mar');
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });
});
