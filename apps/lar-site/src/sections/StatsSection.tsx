import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { STATS } from '@/constants'
import { Container } from '@/components/Section'

interface CountUpProps {
  target: string
  isVisible: boolean
}

function CountUp({ target, isVisible }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isVisible) return
    const numericStr = target.replace(/[^0-9]/g, '')
    const prefix = target.replace(/[0-9].*/, '')
    const suffix = target.replace(/.*[0-9]/, '')

    if (!numericStr) {
      const t = setTimeout(() => setDisplayValue(target), 300)
      return () => clearTimeout(t)
    }

    const end = parseInt(numericStr, 10)
    const duration = 1600
    const start = performance.now()
    const step = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(`${prefix}${Math.floor(eased * end)}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isVisible, target])

  return <>{displayValue}</>
}

/**
 * Stats — banda com fundo roxo (#6A25D5), números em verde-limão.
 * Cria ritmo visual forte logo abaixo do Hero.
 */
export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      aria-label="Números da Lar+"
      className="relative overflow-hidden"
      style={{ background: '#6A25D5' }}
    >
      {/* Decoração top */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D2FE30 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F6502F 0%, transparent 70%)' }}
        />
        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10 py-16">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 divide-x divide-white/15">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center text-center px-6 py-8 group cursor-default"
            >
              {/* Valor */}
              <p
                className="font-heading font-black text-[#D2FE30] mb-1 group-hover:scale-105 transition-transform duration-300"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', lineHeight: 1 }}
                aria-live="polite"
              >
                <CountUp target={stat.value} isVisible={isInView} />
              </p>
              {/* Label */}
              <p className="text-white/70 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
