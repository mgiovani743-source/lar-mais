import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/constants'
import { Container } from '@/components/Section'
import type { PlatformSettings } from '@lar/shared'

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  settings?: PlatformSettings | null;
}

/**
 * Hero Section — Background dinâmico (branco para verde-limão) e logo como watermark.
 */
export default function HeroSection({ title, subtitle, settings }: HeroSectionProps) {
  const handleHowItWorks = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      aria-label="Seção principal — Lar+ Minha Casa Minha Vida"
      className="relative pt-28 pb-16 sm:pb-20 lg:pt-40 lg:pb-32 overflow-hidden hero-gradient"
    >
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Coluna Esquerda: Texto (7 colunas) ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge minimalista (Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-semibold tracking-wide uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              Minha Casa Minha Vida • RS
            </motion.div>

            {/* Logo (Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex lg:hidden items-start mb-5"
            >
              {settings?.brand?.logoDark ? (
                <img src={settings.brand.logoDark} alt={settings.brand.name} className="h-9 w-auto object-contain" />
              ) : (
                <span className="font-heading font-extrabold text-3xl tracking-tight text-neutral-900 select-none">
                  {settings?.brand?.name || 'Lar+'}
                </span>
              )}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-black text-neutral-900 mb-6 text-balance"
              style={{
                fontSize: 'clamp(2.1rem, 8vw, 4.8rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
              }}
            >
              {title || (
                <>
                  Seu apartamento <br className="hidden lg:block" />
                  <span className="relative">
                    <span className="relative z-10 text-secondary">
                      próprio
                    </span>
                    {/* Underline verde (volta ao original pois o fundo esquerdo é branco) */}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-3 text-primary opacity-80"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>{' '}
                  sem burocracia.
                </>
              )}
            </motion.h1>

            {/* Subtítulo clean */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-600 mb-8 leading-relaxed text-base sm:text-lg lg:text-xl text-balance"
            >
              {subtitle || 'Transformamos a jornada de compra no Minha Casa Minha Vida em uma experiência simples, transparente e totalmente focada em você.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-secondary text-white rounded-full font-bold text-base hover:bg-secondary-600 hover:shadow-strong hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Fazer simulação gratuita
              </a>
              <button
                onClick={handleHowItWorks}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 sm:py-4 text-neutral-600 font-bold text-base hover:text-secondary transition-colors duration-300"
              >
                Entender o processo
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* ── Coluna Direita: Visual (5 colunas) ── */}
          <div className="hidden lg:flex lg:col-span-5 relative mt-16 lg:mt-0 justify-center lg:justify-end min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none z-0"
            >
              {/* Logo transparente atuando como textura/background no lado direito. */}
              <img
                src="/logo-transparent.png"
                alt=""
                className="w-full h-auto lg:min-w-[700px] lg:-mr-32 object-contain opacity-75"
                aria-hidden="true"
              />
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  )
}
