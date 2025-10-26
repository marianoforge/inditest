import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders spinner with accessibility role', () => {
    render(<LoadingSpinner />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });

  it('has loading text for screen readers', () => {
    render(<LoadingSpinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
