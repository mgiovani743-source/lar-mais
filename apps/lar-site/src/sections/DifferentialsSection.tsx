import { motion } from 'framer-motion'
import { HeartHandshake, Award, MapPin, Headphones, type LucideIcon } from 'lucide-react'
import { DIFFERENTIALS } from '@/constants'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'

const ICON_MAP: Record<string, LucideIcon> = {
  'heart-handshake': HeartHandshake,
  'award': Award,
  'map-pin': MapPin,
  'headphones': Headphones,
}

/**
 * Diferenciais — fundo branco com acento laranja nos ícones.
 * Visual orgânico com logo grande no lado esquerdo.
 */
export default function DifferentialsSection() {
  return (
    <section
      aria-labelledby="diff-title"
      className="relative overflow-hidden"
    >
      {/* Fundo: banda laranja estreita no topo + branco */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-accent" aria-hidden="true" />

      {/* Decorações */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #D2FE30 0%, transparent 60%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #6A25D5 0%, transparent 60%)' }}
        />
      </div>

      <div className="section-padding relative z-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Coluna esquerda — Logo + Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-2 lg:order-1 flex flex-col items-center"
              aria-hidden="true"
            >
              {/* Círculo verde de fundo */}
              <div
                className="absolute w-80 h-80 rounded-full opacity-25"
                style={{ background: 'radial-gradient(circle, #D2FE30 0%, transparent 70%)' }}
              />

              {/* Logo centralizada */}
              <img
                src="/logo.png"
                alt=""
                className="relative z-10 w-52 h-52 object-contain drop-shadow-xl"
              />

              {/* Card de stat */}
              <div className="relative z-10 -mt-4 bg-white rounded-2xl shadow-strong p-5 w-72 border border-neutral-100">
                <div className="text-center pb-4 border-b border-neutral-100 mb-4">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold mb-1">Resultado dos clientes</p>
                  <p
                    className="font-heading font-black text-secondary"
                    style={{ fontSize: '2.8rem', lineHeight: 1 }}
                  >
                    94<span className="text-primary">%</span>
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">taxa de aprovação</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '+500', label: 'Famílias' },
                    { value: '5★', label: 'Avaliação' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="font-heading font-black text-neutral-900 text-xl">{item.value}</p>
                      <p className="text-xs text-neutral-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge flutuante */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 -right-4 bg-accent text-white rounded-xl shadow-medium px-3 py-2"
              >
                <p className="text-xs font-bold">100% focada em</p>
                <p className="text-xs font-black">Minha Casa Minha Vida</p>
              </motion.div>
            </motion.div>

            {/* Coluna direita — Texto e lista */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge variant="accent" className="mb-4">Por que a Lar+?</Badge>
                <h2
                  id="diff-title"
                  className="font-heading font-extrabold text-neutral-900 mb-5 text-balance"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
                >
                  Não somos uma imobiliária comum.{' '}
                  <span className="gradient-text">Somos seus aliados.</span>
                </h2>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Enquanto outras imobiliárias trabalham com tudo, nós somos 100% especialistas no
                  Minha Casa Minha Vida. Isso faz toda a diferença na hora de conseguir aprovação.
                </p>

                <div className="space-y-5">
                  {DIFFERENTIALS.map((item, index) => {
                    const Icon = ICON_MAP[item.icon] || Award
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex gap-4 items-start group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                          <Icon
                            className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-300"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-neutral-900 mb-1">{item.title}</h3>
                          <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
