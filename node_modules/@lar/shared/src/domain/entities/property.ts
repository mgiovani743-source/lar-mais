export enum PropertyStatus {
  LAUNCH = 'Lançamento',
  CONSTRUCTION = 'Em obras',
  READY = 'Pronto para morar',
  AVAILABLE = 'Disponível',
  SOLD = 'Vendido'
}

export interface Amenity {
  id: string;
  name: string;
  iconKey: string;
}

export interface Highlight {
  id: string;
  text: string;
  iconKey?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  cover: boolean;
  order: number;
  storageProvider?: string;
  storageKey?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  robots?: string;
}

export interface Property {
  // Metadata / Identifiers
  id: string;
  slug: string;
  
  // Basic Info
  title: string;
  shortDescription: string;
  fullDescription: string;
  
  // Financial
  priceFrom: number;
  priceTo?: number;
  estimatedDownpayment?: number;
  estimatedInstallment?: number;
  acceptsFGTS: boolean;
  mcmvEligible: boolean;
  
  // Location
  city: string;
  state: string;
  neighborhood: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  
  // Features
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  privateArea: number;
  totalArea?: number;
  
  // Rich Features
  amenities: Amenity[];
  highlights: Highlight[];
  gallery: PropertyImage[];
  videoUrl?: string;
  
  // Meta / Config
  status: PropertyStatus;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  seo: SEOConfig;
  
  // Persistence Meta
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
