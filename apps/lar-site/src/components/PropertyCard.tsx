import { motion } from 'framer-motion'
import { MapPin, Bed, Maximize2, Bath, Car, ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import { formatPrice } from '@/utils'
import type { Property } from '@lar/shared'

interface PropertyCardProps {
  property: Property
  index?: number
}

/**
 * Premium property listing card with hover lift effect
 */
export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const coverImage = property.gallery?.find(img => img.cover)?.url || property.gallery?.[0]?.url || ''
  const badgeVariant = property.status === 'Lançamento' ? 'accent' : property.status === 'Em obras' ? 'secondary' : 'primary'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group card-base flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-200">
        {coverImage && (
          <img
            src={coverImage}
            alt={`Foto do ${property.title} no bairro ${property.neighborhood}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}
        {property.status && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant} size="sm">
              {property.status}
            </Badge>
          </div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-neutral-900 font-bold text-lg px-3 py-1 rounded-xl shadow-soft">
            {formatPrice(property.priceFrom)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1 group-hover:text-secondary transition-colors duration-250 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4 line-clamp-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{property.neighborhood}, {property.city}</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 py-4 border-t border-neutral-100">
          {[
            { icon: Bed, label: `${property.bedrooms} dorm.`, ariaLabel: `${property.bedrooms} dormitórios` },
            { icon: Maximize2, label: `${property.privateArea}m²`, ariaLabel: `${property.privateArea} metros quadrados` },
            { icon: Bath, label: `${property.bathrooms} ban.`, ariaLabel: `${property.bathrooms} banheiro` },
            { icon: Car, label: `${property.parkingSpaces} vaga`, ariaLabel: `${property.parkingSpaces} vaga de garagem` },
          ].map(({ icon: Icon, label, ariaLabel }) => (
            <div key={label} className="flex flex-col items-center gap-1" aria-label={ariaLabel}>
              <Icon className="w-4 h-4 text-secondary" aria-hidden="true" />
              <span className="text-xs font-medium text-neutral-600 text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Link
            to={`/imoveis/${property.slug}`}
            className={clsx(
              'w-full flex items-center justify-center gap-2',
              'bg-secondary text-white font-semibold py-3 px-4 rounded-xl',
              'hover:bg-secondary-600 hover:shadow-secondary',
              'transition-all duration-250 hover:scale-[1.02]',
              'focus-visible:ring-4 focus-visible:ring-secondary/30',
            )}
          >
            Ver detalhes
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
