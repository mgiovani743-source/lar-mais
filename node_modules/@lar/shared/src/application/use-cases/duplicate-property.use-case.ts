import { IPropertyRepository } from '../../domain/contracts/property.repository.interface';
import { Property } from '../../domain/entities/property';
import { generateUUID } from '../../shared/utils/id.util';
import { slugify } from '../../shared/utils/slug.util';

export class DuplicatePropertyUseCase {
  constructor(private readonly repository: IPropertyRepository) {}

  async execute(idToDuplicate: string, user: string = 'system'): Promise<Property> {
    const original = await this.repository.getById(idToDuplicate);
    
    if (!original) {
      throw new Error('Property not found');
    }

    const newId = generateUUID();
    const newTitle = `${original.title} (Cópia)`;
    let newSlug = slugify(newTitle);
    
    const existing = await this.repository.getBySlug(newSlug);
    if (existing) {
      newSlug = `${newSlug}-${newId.split('-')[0]}`;
    }

    const now = new Date().toISOString();

    const duplicatedProperty: Property = {
      ...original,
      id: newId,
      title: newTitle,
      slug: newSlug,
      published: false, // Always draft on duplicate
      createdAt: now,
      updatedAt: now,
      updatedBy: user,
    };

    return this.repository.create(duplicatedProperty);
  }
}
