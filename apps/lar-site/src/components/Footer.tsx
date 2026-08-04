import { motion } from 'framer-motion'
import { MessageCircle, Instagram, MapPin, Phone, ArrowUp } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL, INSTAGRAM_URL } from '@/constants'
import type { PlatformContent, PlatformSettings } from '@lar/shared'

interface FooterProps {
  content?: PlatformContent | null;
  settings?: PlatformSettings | null;
}

/**
 * Footer com fundo escuro, logo real, links e redes sociais
 */
export default function Footer({ content, settings }: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-neutral-950 text-white" role="contentinfo">
      {/* Wave separator inspirado na curva-sorriso da logo */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 70V35C160 5 320 0 480 15C640 30 800 45 960 35C1120 25 1280 5 1440 10V70H0Z" fill="#D2FE30" />
        </svg>
      </div>


      {/* Conteúdo principal do footer */}
      <div className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Logo Lar+" className="w-10 h-10 object-contain rounded-lg" />
                <span className="font-heading font-extrabold text-2xl">
                  lar<span className="text-primary">+</span>
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Especialistas em Minha Casa Minha Vida em Porto Alegre. Seu sonho da casa própria começa aqui.
              </p>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Lar+"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/8 hover:bg-primary hover:text-neutral-900 text-white transition-all duration-250"
                >
                  <Instagram className="w-4.5 h-4.5" aria-hidden="true" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da Lar+"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/8 hover:bg-green-500 text-white transition-all duration-250"
                >
                  <MessageCircle className="w-4.5 h-4.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Navegação */}
            <div>
              <h3 className="font-heading font-bold text-xs tracking-widest uppercase text-neutral-400 mb-5">
                Navegação
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programa */}
            <div>
              <h3 className="font-heading font-bold text-xs tracking-widest uppercase text-neutral-400 mb-5">
                Programa MCMV
              </h3>
              <ul className="space-y-3">
                {['Faixa 1 (até R$ 2.640)', 'Faixa 2 (até R$ 4.400)', 'Faixa 3 (até R$ 8.000)', 'Subsídio do Governo', 'Uso de FGTS'].map((item) => (
                  <li key={item} className="text-neutral-400 text-sm">{item}</li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div id="contato">
              <h3 className="font-heading font-bold text-xs tracking-widest uppercase text-neutral-400 mb-5">
                Contato
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                    className="flex items-center gap-2.5 text-neutral-400 hover:text-green-400 transition-colors text-sm group">
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    (51) 9 9999-9999
                  </a>
                </li>
                <li>
                  <a href="tel:+5551999999999" aria-label="Telefone"
                    className="flex items-center gap-2.5 text-neutral-400 hover:text-primary transition-colors text-sm group">
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    (51) 9 9999-9999
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                  Porto Alegre, Rio Grande do Sul
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Lar+. Todos os direitos reservados. · Porto Alegre - RS
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-primary transition-colors duration-200"
            >
              Voltar ao topo <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
