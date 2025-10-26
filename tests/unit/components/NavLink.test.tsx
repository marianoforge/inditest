import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavLink } from '@/components/ui/NavLink';

describe('NavLink', () => {
  it('renders link with correct href', () => {
    render(
      <NavLink href="/test" className="test-class">
        Test Link
      </NavLink>
    );

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('test-class');
  });

  it('dispatches navigationStart event on click', async () => {
    const user = userEvent.setup();
    const eventListener = vi.fn();

    window.addEventListener('navigationStart', eventListener);

    render(<NavLink href="/podcast/123">Click Me</NavLink>);

    const link = screen.getByRole('link', { name: /click me/i });
    await user.click(link);

    expect(eventListener).toHaveBeenCalledTimes(1);

    window.removeEventListener('navigationStart', eventListener);
  });

  it('calls custom onClick handler if provided', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(
      <NavLink href="/test" onClick={onClickMock}>
        Custom Handler
      </NavLink>
    );

    const link = screen.getByRole('link', { name: /custom handler/i });
    await user.click(link);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
