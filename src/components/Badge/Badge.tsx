import React from 'react';

export type BadgeVariant = 'neutral' | 'positive' | 'negative';

export interface BadgeProps {
  label: string | number;
  variant?: BadgeVariant;
  'aria-label'?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  'aria-label': ariaLabel,
  className = '',
}) => {
  return (
    <span
      className={`ds-badge ds-badge--${variant} ${className}`}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {label}
    </span>
  );
};