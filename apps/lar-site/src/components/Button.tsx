import { forwardRef } from 'react'
import { clsx } from 'clsx'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  as?: 'a' | 'button'
  href?: string
  target?: string
  rel?: string
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-secondary text-white border-2 border-secondary',
    'hover:bg-secondary-600 hover:border-secondary-600',
    'hover:shadow-secondary hover:scale-[1.03]',
    'focus-visible:ring-4 focus-visible:ring-secondary/30',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-transparent text-secondary border-2 border-secondary',
    'hover:bg-secondary hover:text-white',
    'hover:shadow-secondary hover:scale-[1.03]',
    'focus-visible:ring-4 focus-visible:ring-secondary/30',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-neutral-700 border-2 border-transparent',
    'hover:bg-neutral-100 hover:border-neutral-200',
    'focus-visible:ring-4 focus-visible:ring-neutral-300',
    'active:scale-[0.98]',
  ].join(' '),
  accent: [
    'bg-accent text-white border-2 border-accent',
    'hover:bg-accent-dark hover:border-accent-dark',
    'hover:scale-[1.03]',
    'focus-visible:ring-4 focus-visible:ring-accent/30',
    'active:scale-[0.98]',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-full font-semibold gap-1.5',
  md: 'px-6 py-3 text-base rounded-full font-semibold gap-2',
  lg: 'px-8 py-4 text-lg rounded-full font-bold gap-2.5',
  xl: 'px-10 py-5 text-xl rounded-full font-bold gap-3',
}

/**
 * Button component — supports button and anchor elements
 * Variants: primary (filled purple), secondary (outline), ghost, accent (orange)
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      as = 'button',
      href,
      target,
      rel,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses = clsx(
      'inline-flex items-center justify-center',
      'transition-all duration-250 ease-out',
      'cursor-pointer select-none whitespace-nowrap',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      className,
    )

    const content = (
      <>
        {loading && (
          <svg className="animate-spin -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && !loading && <span className="flex-shrink-0">{icon}</span>}
      </>
    )

    if (as === 'a' && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          aria-disabled={disabled}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        className={baseClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
