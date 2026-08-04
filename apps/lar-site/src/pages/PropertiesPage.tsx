import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Search, SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'
import PropertyCard from '@/components/PropertyCard'
import { contactConfig } from '@/config/contact.config'
import { propertyService } from '@/config/di'
import type { Property, PropertyFilter, PlatformSettings } from '@lar/shared'

interface PropertiesPageProps {
  settings?: PlatformSettings | null;
}

/**
 * Properties listing page with full grid and filters
 */
export default function PropertiesPage({ settings }: PropertiesPageProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Filters State
  const [filters, setFilters] = useState<PropertyFilter>({
    published: true,
    page: 1,
    pageSize: 9,
    sort: 'createdAt',
    order: 'desc'
  })

  const loadProperties = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await propertyService.listProperties(filters)
      setProperties(data)
    } catch (error) {
      console.error('Failed to load properties', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  const updateFilter = (key: keyof PropertyFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 })) // Reset page on filter change
  }

  return (
    <div className="pt-24 pb-20 bg-[#FEFEFE] min-h-screen">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 pt-8"
        >
          <Badge variant="primary" className="mb-4">Imóveis Disponíveis</Badge>
          <h1
            className="font-heading font-extrabold text-neutral-900 mb-4 text-balance"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Todos os imóveis{' '}
            <span className="gradient-text">disponíveis</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Encontre o apartamento ideal para você em Porto Alegre. Todos dentro do programa Minha Casa Minha Vida.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Buscar por título..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border-none focus:ring-2 focus:ring-secondary/20"
              value={filters.title || ''}
              onChange={e => updateFilter('title', e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto">
            <select 
              className="px-4 py-3 rounded-xl bg-neutral-50 border-none focus:ring-2 focus:ring-secondary/20 text-neutral-700 font-medium min-w-[140px]"
              value={filters.bedrooms || ''}
              onChange={e => updateFilter('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">Quartos</option>
              <option value="1">1+ Quartos</option>
              <option value="2">2+ Quartos</option>
              <option value="3">3+ Quartos</option>
            </select>
            
            <select 
              className="px-4 py-3 rounded-xl bg-neutral-50 border-none focus:ring-2 focus:ring-secondary/20 text-neutral-700 font-medium min-w-[160px]"
              value={filters.maxPrice || ''}
              onChange={e => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">Faixa de Preço</option>
              <option value="200000">Até R$ 200k</option>
              <option value="300000">Até R$ 300k</option>
              <option value="500000">Até R$ 500k</option>
            </select>

            <button 
              className="px-6 py-3 rounded-xl bg-secondary text-white font-bold hover:bg-secondary-600 transition-colors flex items-center gap-2"
              onClick={() => loadProperties()}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrar
            </button>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="animate-pulse bg-neutral-100 rounded-2xl h-[400px]"></div>
             ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 bg-neutral-50 rounded-3xl border border-neutral-100 mb-12">
             <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-neutral-900 mb-2">Nenhum imóvel encontrado</h3>
             <p>Tente ajustar os filtros de busca para ver mais resultados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}

        {/* Pagination placeholder (if limit is reached, we'd add "Load More" here) */}
        {!isLoading && properties.length >= (filters.pageSize || 9) && (
          <div className="text-center mb-12">
            <button 
              onClick={() => setFilters(prev => ({ ...prev, pageSize: (prev.pageSize || 9) + 9 }))}
              className="px-8 py-3 rounded-full border-2 border-neutral-200 text-neutral-600 font-bold hover:border-secondary hover:text-secondary transition-colors"
            >
              Carregar mais imóveis
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <a
            href={contactConfig.whatsapp.getLink('Gostaria de falar com um especialista sobre imóveis em Porto Alegre.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-secondary-600 hover:shadow-secondary hover:scale-[1.03] transition-all duration-250"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Falar com especialista
          </a>
        </div>
      </Container>
    </div>
  )
}
