import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface WhatsAppFloatProps {
  phone?: string;
  message?: string;
}

/**
 * Floating WhatsApp button — appears after scrolling 300px
 * Pulses subtly to draw attention, includes tooltip on hover
 */
export default function WhatsAppFloat({ phone, message }: WhatsAppFloatProps) {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Format phone for wa.me link by stripping non-numeric
  const formattedPhone = phone ? phone.replace(/\D/g, '') : '';
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const waLink = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      {visible && formattedPhone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-neutral-900 text-white text-sm font-medium px-3 py-2 rounded-xl shadow-strong whitespace-nowrap"
              >
                Falar no WhatsApp 💬
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="group relative w-16 h-16 flex items-center justify-center"
          >
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" aria-hidden="true" />
            <span className="absolute inset-1 rounded-full bg-green-400/20 animate-pulse-slow" aria-hidden="true" />

            {/* Main button */}
            <span className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-strong transition-all duration-250 group-hover:scale-110">
              <MessageCircle className="w-7 h-7 text-white" fill="white" strokeWidth={0} />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
