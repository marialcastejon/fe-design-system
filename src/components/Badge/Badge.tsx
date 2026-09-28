import React from 'react';
import styles from './Badge.module.css';

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
  const variantClass =
    variant === 'positive'
      ? styles.positive
      : variant === 'negative'
      ? styles.negative
      : styles.neutral;

  return (
    <span
      className={`${styles.badge} ${variantClass} ${className}`.trim()}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {label}
    </span>
  );
};