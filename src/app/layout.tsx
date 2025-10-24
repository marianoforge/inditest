import type { Metadata } from 'next';
import { QueryProvider } from '@/context/QueryProvider';
import { FilterProvider } from '@/context/FilterContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Discover and listen to your favorite music podcasts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <FilterProvider>{children}</FilterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
