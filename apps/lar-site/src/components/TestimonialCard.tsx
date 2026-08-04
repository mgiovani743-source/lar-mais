import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

/**
 * Premium testimonial card with avatar, rating stars and content
 */
export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="card-base p-6 flex flex-col gap-4 min-w-[280px] sm:min-w-[380px]"
    >
      {/* Stars */}
      <div className="flex gap-0.5" role="img" aria-label={`${testimonial.rating} de 5 estrelas`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-primary" fill="#D2FE30" strokeWidth={0} aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-neutral-700 leading-relaxed text-[0.95rem] flex-1">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3 pt-2 border-t border-neutral-100">
        <img
          src={testimonial.avatarUrl}
          alt={`Foto de ${testimonial.name}`}
          className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/40"
          loading="lazy"
        />
        <div>
          <p className="font-bold text-neutral-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-neutral-500">{testimonial.role} · {testimonial.neighborhood}</p>
        </div>
      </footer>
    </motion.div>
  )
}
