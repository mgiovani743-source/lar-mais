import { IPropertyRepository } from '../../domain/contracts/property.repository.interface';
import { PropertyStatus } from '../../domain/entities/property';

export interface DashboardStats {
  totalProperties: number;
  published: number;
  drafts: number;
  featured: number;
}

export class DashboardStatsUseCase {
  constructor(private readonly repository: IPropertyRepository) {}

  async execute(): Promise<DashboardStats> {
    // In a real DB, we'd use aggregate queries (e.g. COUNT, GROUP BY).
    // With our Mock API/LocalStorage, we fetch all and calculate in memory.
    const allProperties = await this.repository.list();

    return {
      totalProperties: allProperties.length,
      published: allProperties.filter(p => p.published).length,
      drafts: allProperties.filter(p => !p.published).length,
      featured: allProperties.filter(p => p.featured).length,
    };
  }
}
