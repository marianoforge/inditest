import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterProvider } from '@/context/FilterContext';

describe('PageHeader', () => {
  it('renders correctly with results count', () => {
    const { container } = render(
      <FilterProvider>
        <PageHeader resultsCount={42} />
      </FilterProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders correctly without errors', () => {
    const { container } = render(
      <FilterProvider>
        <PageHeader resultsCount={0} />
      </FilterProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
