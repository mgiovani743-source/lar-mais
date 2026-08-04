import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Calculator, Home, CheckCircle, FileText, Key, type LucideIcon
} from 'lucide-react'
import { STEPS } from '@/constants'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  home: Home,
  'check-circle': CheckCircle,
  'file-text': FileText,
  key: Key,
}

/**
 * How it works — fundo alternando branco e verde-limão suave.
 * Timeline simplificada e limpa, vertical em coluna única.
 */
export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="como-funciona"
      aria-labelledby="how-title"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEFEFE 0%, #f9ffe8 100%)' }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #D2FE30 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6A25D5 0%, transparent 60%)' }}
        />
      </div>

      <div className="section-padding relative z-10">
        <Container>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">Como Funciona</Badge>
              <h2
                id="how-title"
                className="font-heading font-extrabold text-neutral-900 mb-4 text-balance"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
              >
                Do sonho às chaves em{' '}
                <span className="gradient-text">5 passos simples</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                Nossa equipe cuida de toda a burocracia. Você só precisa sonhar — nós fazemos o resto.
              </p>
            </motion.div>
          </div>

          {/* Steps — lista vertical com número lateral */}
          <div ref={ref} className="max-w-2xl mx-auto relative">
            {/* Linha vertical conectora */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-neutral-200" aria-hidden="true">
              <motion.div
                className="w-full bg-gradient-to-b from-secondary to-primary origin-top"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>

            <ol className="space-y-6">
              {STEPS.map((step, index) => {
                const Icon = ICONS[step.icon] || Home
                return (
                  <motion.li
                    key={step.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex gap-6 items-start"
                  >
                    {/* Ícone circular */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-medium transition-all duration-300 hover:scale-105 ${
                        index % 2 === 0 ? 'bg-secondary' : 'bg-primary'
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Card de conteúdo */}
                    <div className="flex-1 bg-white rounded-2xl p-5 shadow-soft border border-neutral-100 hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                          Passo {step.number}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-neutral-900 text-base mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  )
}
