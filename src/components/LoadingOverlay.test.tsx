import { act, render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders correctly with given progress', () => {
    render(<LoadingOverlay progress={50} isLoading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('updates progress correctly', () => {
    const { rerender } = render(
      <LoadingOverlay progress={25} isLoading={true} />
    );

    let progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveStyle('transform: translateX(-75%)');

    rerender(<LoadingOverlay progress={75} isLoading={true} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveStyle('transform: translateX(-25%)');
  });

  it('fades out and removes from DOM when not loading', async () => {
    vi.useFakeTimers();
    const { rerender } = render(
      <LoadingOverlay progress={100} isLoading={true} />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    rerender(<LoadingOverlay progress={100} isLoading={false} />);

    expect(
      screen.getByRole('progressbar').parentElement?.parentElement
    ).toHaveClass('opacity-0');

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('has correct accessibility attributes', () => {
    render(<LoadingOverlay progress={50} isLoading={true} />);

    const progressBar = screen.getByRole('progressbar')
      .firstChild as HTMLElement;
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-labelledby');
  });
});
