import { z } from 'zod';
import { PropertyStatus } from '../../domain/entities/property';

export const AmenitySchema = z.object({
  id: z.string(),
  name: z.string(),
  iconKey: z.string(),
});

export const HighlightSchema = z.object({
  id: z.string(),
  text: z.string(),
  iconKey: z.string().optional(),
});

export const PropertyImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
  cover: z.boolean(),
  order: z.number(),
});

export const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
  robots: z.string().optional(),
});

export const CreatePropertySchema = z.object({
  title: z.string().min(3),
  shortDescription: z.string().min(10).max(200),
  fullDescription: z.string().min(20),
  priceFrom: z.number().positive(),
  priceTo: z.number().positive().optional(),
  estimatedDownpayment: z.number().nonnegative().optional(),
  estimatedInstallment: z.number().nonnegative().optional(),
  acceptsFGTS: z.boolean(),
  mcmvEligible: z.boolean(),
  city: z.string().min(2),
  state: z.string().length(2),
  neighborhood: z.string().min(2),
  address: z.string().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  parkingSpaces: z.number().int().nonnegative(),
  privateArea: z.number().positive(),
  totalArea: z.number().positive().optional(),
  amenities: z.array(AmenitySchema),
  highlights: z.array(HighlightSchema),
  gallery: z.array(PropertyImageSchema),
  videoUrl: z.string().url().optional(),
  status: z.nativeEnum(PropertyStatus),
  published: z.boolean(),
  featured: z.boolean(),
  displayOrder: z.number().int(),
  seo: SEOSchema,
});

export const UpdatePropertySchema = CreatePropertySchema.partial();
