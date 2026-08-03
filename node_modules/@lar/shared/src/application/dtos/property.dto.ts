import { PropertyStatus, Amenity, Highlight, PropertyImage, SEOConfig } from '../../domain/entities/property';

export interface CreatePropertyDTO {
  title: string;
  shortDescription: string;
  fullDescription: string;
  priceFrom: number;
  priceTo?: number;
  estimatedDownpayment?: number;
  estimatedInstallment?: number;
  acceptsFGTS: boolean;
  mcmvEligible: boolean;
  city: string;
  state: string;
  neighborhood: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  privateArea: number;
  totalArea?: number;
  amenities: Amenity[];
  highlights: Highlight[];
  gallery: PropertyImage[];
  videoUrl?: string;
  status: PropertyStatus;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  seo: SEOConfig;
}

export type UpdatePropertyDTO = Partial<CreatePropertyDTO>;
