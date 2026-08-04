import { motion } from 'framer-motion'
import {
  TrendingDown, CreditCard, ShieldCheck, Users, Zap, Building2, type LucideIcon
} from 'lucide-react'
import { BENEFITS } from '@/constants'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'

const ICON_MAP: Record<string, LucideIcon> = {
  'trending-down': TrendingDown,
  'credit-card': CreditCard,
  'shield-check': ShieldCheck,
  'users': Users,
  'zap': Zap,
  'building-2': Building2,
}

/**
 * Benefits — fundo roxo escuro com cards brancos sobre ele.
 * Visual premium que destoa positivamente das seções brancas.
 */
export default function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="benefits-title"
      className="relative overflow-hidden"
      style={{ background: '#6A25D5' }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #D2FE30 0%, transparent 60%)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F6502F 0%, transparent 60%)' }}
        />
        {/* Curva decorativa da logo */}
        <svg className="absolute right-0 bottom-0 opacity-8 w-80" viewBox="0 0 320 200" fill="none" aria-hidden="true">
          <path d="M20 180 Q160 80 300 20" stroke="white" strokeWidth="60" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="section-padding relative z-10">
        <Container>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="primary" className="mb-4">Benefícios</Badge>
              <h2
                id="benefits-title"
                className="font-heading font-extrabold text-white mb-4 text-balance"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
              >
                Tudo que você precisa para{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D2FE30 0%, #c5f020 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  conquistar seu lar
                </span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                O Minha Casa Minha Vida oferece condições que você não encontra em nenhum outro financiamento.
                E a Lar+ garante que você aproveite cada benefício.
              </p>
            </motion.div>
          </div>

          {/* Grid de cards brancos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, index) => {
              const Icon = ICON_MAP[benefit.icon] || Zap

              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-2xl p-6 hover:shadow-strong hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Decoração interna */}
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full transition-all duration-500 group-hover:scale-150 bg-primary/10"
                    aria-hidden="true"
                  />

                  {/* Ícone */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-secondary group-hover:scale-105">
                    <Icon
                      className="w-5 h-5 text-secondary group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Texto */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-neutral-900 mb-2 flex items-center gap-2">
                      <span className="text-primary font-black text-lg" aria-hidden="true">✓</span>
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>

                  {/* Linha de acento verde no hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"
                    aria-hidden="true"
                  />
                </motion.div>
              )
            })}
          </div>
        </Container>
      </div>
    </section>
  )
}
