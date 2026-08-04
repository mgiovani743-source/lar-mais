import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MapPin, Bed, Maximize2, Bath, Car, CheckCircle2, MessageCircle } from 'lucide-react'
import { Container } from '@/components/Section'
import Badge from '@/components/Badge'
import PropertyCard from '@/components/PropertyCard'
import { NotFound } from './NotFound'
import { propertyService } from '@/config/di'
import { contactConfig } from '@/config/contact.config'
import { formatPrice } from '@/utils'
import type { Property, PlatformSettings } from '@lar/shared'

interface PropertyDetailPageProps {
  settings?: PlatformSettings | null;
}

export default function PropertyDetailPage({ settings }: PropertyDetailPageProps) {
  const { slug } = useParams<{ slug: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [similarProperties, setSimilarProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    async function loadData() {
      setIsLoading(true)
      try {
        if (!slug) return
        
        // 1. Fetch main property
        const data = await propertyService.getPropertyBySlug(slug)
        if (!isMounted) return
        
        setProperty(data)

        // 2. Fetch similar properties (same neighborhood, excluding current)
        if (data) {
          const similar = await propertyService.listProperties({
            published: true,
            neighborhood: data.neighborhood,
            pageSize: 4
          })
          if (isMounted) {
            // filter out current property and take up to 3
            setSimilarProperties(similar.filter(p => p.id !== data.id).slice(0, 3))
          }
        }
      } catch (error) {
        console.error('Failed to load property details', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()

    return () => { isMounted = false }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!property) {
    return <NotFound />
  }

  const coverImage = property.gallery?.find(img => img.cover)?.url || property.gallery?.[0]?.url || ''
  const badgeVariant = property.status === 'Lançamento' ? 'accent' : property.status === 'Em obras' ? 'secondary' : 'primary'
  
  // WhatsApp Message Configuration
  const message = `Olá, vim pelo site! Tenho interesse no imóvel ${property.title} em ${property.neighborhood}.`
  const whatsappUrl = contactConfig.whatsapp.getLink(message)

  return (
    <div className="pt-24 pb-20 bg-neutral-50 min-h-screen">
      <Helmet>
        <title>{property.seo?.title || `${property.title} | Lar+ Imóveis`}</title>
        <meta name="description" content={property.seo?.description || property.shortDescription} />
        {property.seo?.ogImage && <meta property="og:image" content={property.seo.ogImage} />}
      </Helmet>

      {/* Hero / Cover */}
      <section className="w-full h-[50vh] md:h-[60vh] bg-neutral-900 relative">
        {coverImage && (
          <img 
            src={coverImage} 
            alt={property.title} 
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <Container className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <Badge variant={badgeVariant} className="mb-4">{property.status}</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-4 max-w-4xl">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-white/80 text-lg">
            <MapPin className="w-5 h-5" />
            <span>{property.address ? `${property.address}, ` : ''}{property.neighborhood}, {property.city} - {property.state}</span>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Sobre o imóvel</h2>
              <div 
                className="prose prose-lg text-neutral-600"
                dangerouslySetInnerHTML={{ __html: property.fullDescription?.replace(/\n/g, '<br />') }}
              />
            </section>

            {/* Attributes Grid */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y border-neutral-200">
              <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm text-center">
                <Bed className="w-8 h-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-neutral-900">{property.bedrooms}</span>
                <span className="text-sm text-neutral-500">Dormitórios</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm text-center">
                <Bath className="w-8 h-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-neutral-900">{property.bathrooms}</span>
                <span className="text-sm text-neutral-500">Banheiros</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm text-center">
                <Maximize2 className="w-8 h-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-neutral-900">{property.privateArea}m²</span>
                <span className="text-sm text-neutral-500">Área Privativa</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm text-center">
                <Car className="w-8 h-8 text-secondary mb-2" />
                <span className="text-2xl font-bold text-neutral-900">{property.parkingSpaces}</span>
                <span className="text-sm text-neutral-500">Vagas</span>
              </div>
            </section>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Infraestrutura</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map(amenity => (
                    <div key={amenity.id} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-neutral-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar - Pricing & CTA */}
          <div>
            <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
              <div className="mb-6">
                <span className="text-neutral-500 text-sm font-medium">A partir de</span>
                <h3 className="text-4xl font-bold text-neutral-900 text-balance">
                  {formatPrice(property.priceFrom)}
                </h3>
              </div>
              
              <div className="space-y-4 mb-8">
                {property.mcmvEligible && (
                  <div className="bg-primary/10 text-primary-800 p-4 rounded-xl flex items-center gap-3 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    Elegível ao Minha Casa Minha Vida
                  </div>
                )}
                {property.acceptsFGTS && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    Aceita FGTS na entrada
                  </div>
                )}
              </div>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary hover:bg-secondary-600 text-white py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-soft hover:shadow-secondary hover:scale-[1.02]"
              >
                <MessageCircle className="w-6 h-6" />
                Simular Financiamento
              </a>
              
              <p className="text-center text-sm text-neutral-500 mt-4">
                Resposta rápida. Sem compromisso.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="bg-white py-16 mt-16 border-t border-neutral-100">
          <Container>
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Imóveis semelhantes na região</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop, index) => (
                <PropertyCard key={prop.id} property={prop} index={index} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
