'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Header } from './Header';

export function HeaderClient() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setLoading(true);

    window.addEventListener('navigationStart', handleStart);

    return () => {
      window.removeEventListener('navigationStart', handleStart);
    };
  }, []);

  return <Header showLoading={loading} />;
}
