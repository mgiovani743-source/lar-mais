import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'destructive' | 'draft';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
    primary: 'bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400',
    secondary: 'bg-secondary-100 text-secondary-900 dark:bg-secondary-900/40 dark:text-secondary-100',
    outline: 'border border-neutral-200 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    destructive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    draft: 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
