import { IPropertyRepository, PropertyFilter } from '../../domain/contracts/property.repository.interface';
import { Property } from '../../domain/entities/property';

export class ApiPropertyRepository implements IPropertyRepository {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3333/properties') {
    this.baseUrl = baseUrl;
  }

  async getById(id: string): Promise<Property | null> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

  async getBySlug(slug: string): Promise<Property | null> {
    const res = await fetch(`${this.baseUrl}?slug=${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  }

  async list(filter?: PropertyFilter): Promise<Property[]> {
    let url = this.baseUrl;
    if (filter) {
      const params = new URLSearchParams();
      if (filter.published !== undefined) params.append('published', String(filter.published));
      if (filter.featured !== undefined) params.append('featured', String(filter.featured));
      
      // JSON Server basic exact matching
      if (filter.status) params.append('status', filter.status);
      if (filter.city) params.append('city', filter.city);
      if (filter.neighborhood) params.append('neighborhood', filter.neighborhood);
      if (filter.slug) params.append('slug', filter.slug);
      
      // Range matching (json-server uses _gte and _lte)
      if (filter.bedrooms !== undefined) params.append('bedrooms_gte', String(filter.bedrooms));
      if (filter.minPrice !== undefined) params.append('priceFrom_gte', String(filter.minPrice));
      if (filter.maxPrice !== undefined) params.append('priceFrom_lte', String(filter.maxPrice));
      
      // Fuzzy search
      if (filter.title) params.append('title_like', filter.title);
      
      // Pagination & Sorting (json-server conventions)
      if (filter.page) params.append('_page', String(filter.page));
      if (filter.pageSize) params.append('_limit', String(filter.pageSize));
      if (filter.sort) params.append('_sort', filter.sort);
      if (filter.order) params.append('_order', filter.order);
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  }

  async create(property: Property): Promise<Property> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    if (!res.ok) throw new Error('Failed to create property');
    return res.json();
  }

  async update(id: string, property: Partial<Property>): Promise<Property> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    if (!res.ok) throw new Error('Failed to update property');
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete property');
  }
}
