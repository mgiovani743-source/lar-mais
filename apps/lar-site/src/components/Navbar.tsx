import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollY } from '@/hooks/useScrollY'
import { NAV_LINKS, WHATSAPP_URL } from '@/constants'
import type { PlatformSettings } from '@lar/shared'

interface NavbarProps {
  settings?: PlatformSettings | null;
}

/**
 * Navbar — usa a logo real da Lar+ (agora consumida via config).
 * Transparente no topo, frosted glass após scroll.
 */
export default function Navbar({ settings }: NavbarProps) {
  const scrollY = useScrollY()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isScrolled = scrollY > 50

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const id = href.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <>
      <header
        role="banner"
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/96 backdrop-blur-md shadow-soft border-b border-neutral-100'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo real consumida do CMS ── */}
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); handleNavClick('#inicio') }}
              aria-label={settings?.brand?.name || "Início"}
              className="flex-shrink-0 flex items-center"
            >
              {settings?.brand?.logoDark ? (
                <img src={settings.brand.logoDark} alt={settings.brand.name} className="h-8 w-auto object-contain" />
              ) : (
                <span className={clsx(
                  'font-heading font-extrabold text-2xl tracking-tight transition-colors duration-300 select-none',
                  isScrolled ? 'text-neutral-900' : 'text-neutral-900',
                )}>
                  {settings?.brand?.name || 'Platform'}
                </span>
              )}
            </a>

            {/* ── Desktop Navigation ── */}
            <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    'hover:bg-secondary/10 hover:text-secondary',
                    isScrolled ? 'text-neutral-700' : 'text-neutral-800',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>



            {/* ── Mobile hamburger ── */}
            <button
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-900 hover:bg-neutral-100 transition-all duration-200 focus-visible:ring-4 focus-visible:ring-secondary/30"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="menu"
              role="dialog" aria-modal="true" aria-label="Menu de navegação"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-40 bg-white/98 backdrop-blur-xl rounded-2xl shadow-strong border border-neutral-100 lg:hidden"
            >
              <nav aria-label="Menu mobile" className="p-4">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className="flex items-center px-4 py-3 rounded-xl text-neutral-800 font-medium hover:bg-secondary/8 hover:text-secondary transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
