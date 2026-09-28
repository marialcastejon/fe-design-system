import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders label correctly', () => {
    render(<Badge label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies correct variant class name', () => {
    const { container } = render(<Badge label="Positive" variant="positive" />);
    // CSS modules hash the class name, so we check if a class containing 'positive' exists
    expect(container.firstChild).toHaveClass(/positive/);
  });

  it('renders with accessible aria-label when provided', () => {
    render(<Badge label="12" variant="positive" aria-label="12 new notifications" />);
    const badge = screen.getByLabelText('12 new notifications');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('role', 'img');
  });
});