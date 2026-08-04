import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import type { FAQItem } from '@/types'

interface AccordionProps {
  items: FAQItem[]
}

/**
 * Elegant animated FAQ accordion — only one item open at a time
 */
export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-3" role="list">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            role="listitem"
          >
            <div
              className={clsx(
                'border-2 rounded-2xl overflow-hidden transition-all duration-250',
                isOpen
                  ? 'border-secondary/30 shadow-medium'
                  : 'border-neutral-200 hover:border-secondary/20 hover:shadow-soft',
              )}
            >
              {/* Question button */}
              <button
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors duration-200"
              >
                <span
                  className={clsx(
                    'font-heading font-semibold text-[1.05rem] leading-snug transition-colors duration-200',
                    isOpen ? 'text-secondary' : 'text-neutral-900',
                  )}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={clsx(
                    'flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-200',
                    isOpen ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-500',
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>

              {/* Answer panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
