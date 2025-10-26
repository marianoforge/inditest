import type { Metadata } from 'next';
import { QueryProvider } from '@/context/QueryProvider';
import { FilterProvider } from '@/context/FilterContext';
import { Header } from '@/components/layout';
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
      <body suppressHydrationWarning>
        <QueryProvider>
          <FilterProvider>
            <Header />
            {children}
          </FilterProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
