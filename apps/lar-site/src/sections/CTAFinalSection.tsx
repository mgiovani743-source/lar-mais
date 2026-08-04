import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/constants'
import { Container } from '@/components/Section'
import { Sparkles } from 'lucide-react'

/**
 * CTAFinal — grande bloco verde-limão com CTA forte.
 * Usa a logo em destaque e cores da marca.
 */
export default function CTAFinalSection() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden">
      {/* Wave entrada */}
      <div className="w-full overflow-hidden leading-none -mb-1" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 0V40C200 80 400 90 720 65C1040 40 1240 25 1440 40V0H0Z" fill="#FEFEFE" />
        </svg>
      </div>

      {/* Bloco principal verde-limão */}
      <div className="relative py-24 md:py-36" style={{ background: '#D2FE30' }}>

        {/* Decorações */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Círculo roxo grande */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #6A25D5 0%, transparent 60%)' }}
          />
          {/* Círculo laranja */}
          <div
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F6502F 0%, transparent 60%)' }}
          />
          {/* Grid sutil */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
          {/* Curva da logo — lado direito */}
          <svg className="absolute right-0 bottom-0 opacity-10 w-96" viewBox="0 0 400 300" fill="none">
            <path d="M20 280 Q200 150 380 20" stroke="#6A25D5" strokeWidth="80" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Esquerda — texto */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/25 text-secondary text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Simulação 100% gratuita
              </motion.div>

              <motion.h2
                id="cta-title"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-black text-neutral-900 mb-5 text-balance"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
              >
                Seu apartamento pode estar{' '}
                <span className="text-secondary">
                  mais perto do que você imagina.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-neutral-800/80 mb-8 leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}
              >
                Fale agora com nossos especialistas. Em minutos você descobre o subsídio disponível,
                quanto pode financiar e qual seria sua parcela — sem custo algum.
              </motion.p>

              {/* Checklist */}
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-2 mb-10"
              >
                {['✓ Atendimento imediato', '✓ Sem taxa de corretagem', '✓ Processo simplificado', '✓ 100% em Porto Alegre'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                    {item}
                  </li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar com especialista no WhatsApp"
                  className="group flex items-center justify-center gap-3 px-10 py-5 bg-secondary text-white rounded-full font-black text-lg hover:bg-secondary-600 hover:shadow-secondary hover:scale-[1.03] transition-all duration-250 shadow-strong focus-visible:ring-4 focus-visible:ring-secondary/40"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Quero falar com um especialista
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            {/* Direita — logo e cartão visual */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col items-center justify-center"
              aria-hidden="true"
            >
              {/* Card de credibilidade */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-medium border border-white/60 w-80">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-black text-sm">★</span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">+500 famílias atendidas</p>
                    <p className="text-xs text-neutral-500">em Porto Alegre</p>
                  </div>
                </div>
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-secondary to-primary rounded-full" />
                </div>
                <p className="text-xs text-neutral-500 mt-1 text-right">94% de aprovação</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Wave saída para o footer */}
      <div className="w-full overflow-hidden leading-none -mt-1" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 60V30C360 0 720 10 1080 25C1260 32 1380 28 1440 20V60H0Z" fill="#D2FE30" />
        </svg>
      </div>
    </section>
  )
}
