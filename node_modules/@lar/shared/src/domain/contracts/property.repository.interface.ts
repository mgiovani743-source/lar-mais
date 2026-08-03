import { Property } from '../entities/property';

export interface PropertyFilter {
  title?: string;
  city?: string;
  neighborhood?: string;
  slug?: string;
  status?: string;
  published?: boolean;
  featured?: boolean;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface IPropertyRepository {
  getById(id: string): Promise<Property | null>;
  getBySlug(slug: string): Promise<Property | null>;
  list(filter?: PropertyFilter): Promise<Property[]>;
  create(property: Property): Promise<Property>;
  update(id: string, property: Partial<Property>): Promise<Property>;
  delete(id: string): Promise<void>;
}
