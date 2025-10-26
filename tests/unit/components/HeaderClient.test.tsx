import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderClient } from '@/components/layout/HeaderClient';

describe('HeaderClient', () => {
  it('renders header with logo link', () => {
    render(<HeaderClient />);

    const logo = screen.getByRole('link', { name: /podcaster/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders navigation element', () => {
    const { container } = render(<HeaderClient />);

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
