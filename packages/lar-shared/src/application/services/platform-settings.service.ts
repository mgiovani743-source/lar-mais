import type { IPlatformSettingsRepository } from '../../domain/contracts/platform.repository.interface';
import type { PlatformSettings } from '../../domain/entities/platform';

export class PlatformSettingsService {
  constructor(private readonly repository: IPlatformSettingsRepository) {}

  async getSettings(): Promise<PlatformSettings> {
    return this.repository.get();
  }

  async updateSettings(settings: PlatformSettings, user: string = 'system'): Promise<PlatformSettings> {
    const dataToSave = {
      ...settings,
      metadata: {
        ...settings.metadata,
        updatedBy: user
      }
    };
    return this.repository.update(dataToSave);
  }

  async getHistory(): Promise<PlatformSettings[]> {
    return this.repository.getHistory();
  }
}
