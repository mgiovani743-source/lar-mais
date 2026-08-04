import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/constants'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'
import TestimonialCard from '@/components/TestimonialCard'

/**
 * Testimonials — horizontal scrollable carousel with navigation arrows
 * Auto-scrolls every 5s, pauses on hover/focus
 */
export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = 400
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
  }

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="section-padding bg-gradient-to-br from-secondary/5 via-[#FEFEFE] to-primary/5"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-3">Depoimentos</Badge>
            <h2
              id="testimonials-title"
              className="font-heading font-extrabold text-neutral-900 text-balance"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Quem já realizou o sonho{' '}
              <span className="gradient-text">conta para você</span>
            </h2>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-2 flex-shrink-0" role="group" aria-label="Navegar depoimentos">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Depoimento anterior"
              className="w-10 h-10 rounded-full border-2 border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo depoimento"
              className="w-10 h-10 rounded-full border-2 border-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
            aria-hidden="true"
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="flex gap-5 overflow-x-auto hide-scrollbar pb-4"
            role="list"
            aria-label="Carrossel de depoimentos"
          >
            {/* Duplicate for seamless auto-scroll loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} role="listitem" aria-hidden={index >= TESTIMONIALS.length}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Star summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-neutral-400 text-sm">
            <span className="text-primary text-lg font-bold mr-1">★★★★★</span>
            <span className="font-semibold text-neutral-700">4.9/5</span> baseado em mais de{' '}
            <span className="font-semibold text-neutral-700">200 avaliações</span>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
