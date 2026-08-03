import type { PlatformSettings, PlatformContent } from '../entities/platform';

export interface IPlatformSettingsRepository {
  get(): Promise<PlatformSettings>;
  update(settings: PlatformSettings): Promise<PlatformSettings>;
  getHistory(): Promise<PlatformSettings[]>;
}

export interface IPlatformContentRepository {
  get(): Promise<PlatformContent>;
  update(content: PlatformContent): Promise<PlatformContent>;
  getHistory(): Promise<PlatformContent[]>;
}
