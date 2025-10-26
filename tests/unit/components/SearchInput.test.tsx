import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '@/components/podcast/SearchInput';

describe('SearchInput', () => {
  it('renders input with placeholder', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);
    expect(
      screen.getByPlaceholderText('Filter podcasts...')
    ).toBeInTheDocument();
  });

  it('displays results count badge', () => {
    render(<SearchInput value="" onChange={vi.fn()} resultsCount={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('Filter podcasts...');
    await user.type(input, 'a');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('shows current value', () => {
    render(<SearchInput value="my search" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('my search')).toBeInTheDocument();
  });
});
