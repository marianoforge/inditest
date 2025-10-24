import type { CachedData } from '@/types/podcast.types';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const localStorageService = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const cached: CachedData<T> = JSON.parse(item);
      const now = Date.now();

      if (now - cached.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;

    try {
      const cached: CachedData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cached));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};
