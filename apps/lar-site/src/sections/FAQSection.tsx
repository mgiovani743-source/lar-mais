import { motion } from 'framer-motion'
import { FAQ_ITEMS } from '@/constants'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'
import Accordion from '@/components/Accordion'
import { WHATSAPP_URL } from '@/constants'
import { MessageCircle } from 'lucide-react'

/**
 * FAQ section — elegant accordion with contact CTA on the side
 */
export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-padding bg-[#FEFEFE]">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <Badge variant="primary" className="mb-4">Perguntas Frequentes</Badge>
            <h2
              id="faq-title"
              className="font-heading font-extrabold text-neutral-900 mb-4 text-balance"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Temos as respostas que você precisa
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Ainda tem dúvidas? Nossa equipe está pronta para responder pelo WhatsApp — sem enrolação.
            </p>

            {/* Mini contact card */}
            <div className="bg-secondary/5 border border-secondary/15 rounded-2xl p-5">
              <p className="font-semibold text-neutral-800 mb-1 text-sm">Não encontrou sua resposta?</p>
              <p className="text-neutral-500 text-xs mb-4 leading-relaxed">
                Fale diretamente com nossos especialistas no WhatsApp. Respondemos em minutos!
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tirar dúvidas no WhatsApp com a Lar+"
                className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-secondary text-white rounded-xl font-semibold text-sm hover:bg-secondary-600 hover:shadow-secondary transition-all duration-250"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Tirar dúvidas no WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </Container>
    </section>
  )
}
