import type { IPlatformContentRepository } from '../../domain/contracts/platform.repository.interface';
import type { PlatformContent } from '../../domain/entities/platform';

export class PlatformContentService {
  constructor(private readonly repository: IPlatformContentRepository) {}

  async getContent(): Promise<PlatformContent> {
    return this.repository.get();
  }

  async updateContent(content: PlatformContent, user: string = 'system'): Promise<PlatformContent> {
    const dataToSave = {
      ...content,
      metadata: {
        ...content.metadata,
        updatedBy: user
      }
    };
    return this.repository.update(dataToSave);
  }

  async getHistory(): Promise<PlatformContent[]> {
    return this.repository.getHistory();
  }
}
