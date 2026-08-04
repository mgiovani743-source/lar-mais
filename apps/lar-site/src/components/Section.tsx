import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  animate?: boolean
  as?: 'section' | 'div' | 'article'
}

/**
 * Section wrapper with optional Framer Motion entrance animation
 */
export default function Section({
  id,
  className,
  children,
  animate = true,
  as: Tag = 'section',
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (!animate) {
    return (
      <Tag id={id} className={clsx('section-padding', className)}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag id={id} className={clsx('section-padding', className)}>
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </Tag>
  )
}


interface ContainerProps {
  className?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizeMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * Container with responsive horizontal padding
 */
export function Container({ className, children, size = 'lg' }: ContainerProps) {
  return (
    <div className={clsx('mx-auto px-4 sm:px-6 lg:px-8', sizeMap[size], className)}>
      {children}
    </div>
  )
}
