import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'
import PropertyCard from '@/components/PropertyCard'
import { contactConfig } from '@/config/contact.config'
import { propertyService } from '@/config/di'
import type { Property } from '@lar/shared'

interface PropertiesSectionProps {
  title?: string;
}

/**
 * Properties section — grid of featured properties with CTA to see all
 */
export default function PropertiesSection({ title = 'Encontre seu apartamento ideal' }: PropertiesSectionProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    propertyService.listProperties({ 
      published: true, 
      featured: true, 
      sort: 'displayOrder',
      order: 'asc'
    })
      .then(data => {
        if (isMounted) {
          setProperties(data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.error('Failed to load properties', err)
        if (isMounted) setIsLoading(false)
      })
      
    return () => { isMounted = false }
  }, [])

  return (
    <section id="imoveis" aria-labelledby="properties-title" className="section-padding bg-[#FEFEFE]">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-3">Imóveis Disponíveis</Badge>
            <h2
              id="properties-title"
              className="font-heading font-extrabold text-neutral-900 text-balance"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              {title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="/imoveis"
              aria-label="Ver todos os imóveis"
              className="group flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all duration-200"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-neutral-100 rounded-2xl h-[400px]"></div>
            ))}
          </div>
        ) : properties.length === 0 ? (
           <div className="text-center py-12 text-neutral-500">
             Nenhum imóvel em destaque no momento.
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-500 mb-5 text-sm">
            Não encontrou o que procurava? Temos muito mais opções disponíveis.
          </p>
          <a
            href={contactConfig.whatsapp.getLink('Gostaria de ver outras opções de imóveis disponíveis.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com especialista no WhatsApp sobre imóveis"
            className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-secondary-600 hover:shadow-secondary hover:scale-[1.03] transition-all duration-250 focus-visible:ring-4 focus-visible:ring-secondary/30"
          >
            Falar com um especialista
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
