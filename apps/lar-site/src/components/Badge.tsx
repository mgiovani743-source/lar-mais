import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variantMap = {
  primary: 'bg-primary text-neutral-900 border border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
}

const sizeMap = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3.5 py-1 text-sm',
}

/**
 * Badge / pill component for labels, tags and status indicators
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide',
        variantMap[variant],
        sizeMap[size],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            'h-1.5 w-1.5 rounded-full flex-shrink-0',
            variant === 'primary' && 'bg-neutral-800',
            variant === 'secondary' && 'bg-secondary',
            variant === 'accent' && 'bg-accent',
            variant === 'neutral' && 'bg-neutral-500',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
