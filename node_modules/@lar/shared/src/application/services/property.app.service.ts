import { IPropertyRepository, PropertyFilter } from '../../domain/contracts/property.repository.interface';
import { Property } from '../../domain/entities/property';
import { CreatePropertyDTO, UpdatePropertyDTO } from '../dtos/property.dto';
import { generateUUID } from '../../shared/utils/id.util';
import { slugify } from '../../shared/utils/slug.util';

export class PropertyAppService {
  constructor(private readonly repository: IPropertyRepository) {}

  async getProperty(id: string): Promise<Property | null> {
    return this.repository.getById(id);
  }

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    return this.repository.getBySlug(slug);
  }

  async listProperties(filter?: PropertyFilter): Promise<Property[]> {
    return this.repository.list(filter);
  }

  async createProperty(dto: CreatePropertyDTO, user: string = 'system'): Promise<Property> {
    const id = generateUUID();
    let slug = slugify(dto.title);
    
    // Check slug uniqueness
    const existing = await this.repository.getBySlug(slug);
    if (existing) {
      slug = `${slug}-${id.split('-')[0]}`; // append short id to make unique
    }

    const now = new Date().toISOString();

    const newProperty: Property = {
      ...dto,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
      updatedBy: user
    };

    return this.repository.create(newProperty);
  }

  async updateProperty(id: string, dto: UpdatePropertyDTO, user: string = 'system'): Promise<Property> {
    const updateData: Partial<Property> = {
      ...dto,
      updatedAt: new Date().toISOString(),
      updatedBy: user
    };
    
    // If title changed, we don't automatically change the slug to not break SEO,
    // unless explicitly required by business rules. For now, keep original slug.

    return this.repository.update(id, updateData);
  }

  async deleteProperty(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
