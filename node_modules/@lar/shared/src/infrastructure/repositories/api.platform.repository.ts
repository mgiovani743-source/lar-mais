import type { IPlatformSettingsRepository, IPlatformContentRepository } from '../../domain/contracts/platform.repository.interface';
import type { PlatformSettings, PlatformContent, VersionMetadata } from '../../domain/entities/platform';

const DEFAULT_SETTINGS: PlatformSettings = {
  brand: {
    name: 'Platform Name',
    logoDark: '',
    logoLight: '',
    logoReduced: '',
    iconSquare: '',
    placeholder: '',
  },
  appearance: {
    primary: '#E65100',
    secondary: '#1A202C',
    accent: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    background: '#F5F5F5',
    foreground: '#0A0A0A',
    muted: '#737373',
  },
  contact: {
    mainPhone: '',
    whatsapp: '',
    email: '',
    address: '',
    mapEmbedUrl: '',
    businessHours: '',
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
  },
  seo: {
    globalTitle: 'Real Estate Platform',
    globalDescription: 'Find your dream home.',
    keywords: [],
    ogImage: '',
    robots: 'index, follow',
    canonical: '',
    schemaOrgEnabled: true,
    organizationJsonLd: '',
  },
  integrations: {
    googleAnalyticsId: '',
    metaPixelId: '',
    googleTagManagerId: '',
    hotjarId: '',
    clarityId: '',
  },
  metadata: {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'system',
  }
};

const DEFAULT_CONTENT: PlatformContent = {
  homepageSections: [
    { id: 'hero', type: 'hero', active: true, order: 1, title: 'Encontre o imóvel dos seus sonhos', subtitle: 'A melhor plataforma para você.' },
    { id: 'featured', type: 'featured', active: true, order: 2, title: 'Imóveis em Destaque' },
    { id: 'institutional', type: 'institutional', active: true, order: 3, title: 'Sobre nós' },
  ],
  institutional: {
    aboutUs: '',
    history: '',
    mission: '',
    vision: '',
    values: '',
  },
  footer: {
    institutionalText: 'A plataforma ideal para encontrar seu novo lar.',
    copyright: '© 2026 Todos os direitos reservados.',
    columns: [
      { title: 'Links Rápidos', links: [{ label: 'Início', url: '/' }, { label: 'Imóveis', url: '/imoveis' }] }
    ]
  },
  promoBanner: {
    active: false,
    title: '',
    description: '',
    image: '',
    link: '',
    buttonText: '',
    position: 'top',
  },
  floatingCta: {
    whatsappActive: true,
    whatsappMessage: 'Olá, gostaria de mais informações.',
    simulationActive: false,
    simulationButtonText: 'Simular Financiamento',
  },
  metadata: {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'system',
  }
};

export class LocalPlatformSettingsRepository implements IPlatformSettingsRepository {
  private readonly STORAGE_KEY = 'platform_settings_v1';
  private readonly HISTORY_KEY = 'platform_settings_history_v1';

  async get(): Promise<PlatformSettings> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return DEFAULT_SETTINGS;
    try {
      return JSON.parse(data) as PlatformSettings;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  async update(settings: PlatformSettings): Promise<PlatformSettings> {
    const current = await this.get();
    
    // Save to history
    const history = await this.getHistory();
    history.push(current);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(-10))); // keep last 10

    const newSettings = {
      ...settings,
      metadata: {
        ...settings.metadata,
        version: current.metadata.version + 1,
        updatedAt: new Date().toISOString()
      }
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newSettings));
    return newSettings;
  }

  async getHistory(): Promise<PlatformSettings[]> {
    const data = localStorage.getItem(this.HISTORY_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as PlatformSettings[];
    } catch {
      return [];
    }
  }
}

export class LocalPlatformContentRepository implements IPlatformContentRepository {
  private readonly STORAGE_KEY = 'platform_content_v1';
  private readonly HISTORY_KEY = 'platform_content_history_v1';

  async get(): Promise<PlatformContent> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return DEFAULT_CONTENT;
    try {
      return JSON.parse(data) as PlatformContent;
    } catch {
      return DEFAULT_CONTENT;
    }
  }

  async update(content: PlatformContent): Promise<PlatformContent> {
    const current = await this.get();
    
    // Save to history
    const history = await this.getHistory();
    history.push(current);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(-10))); // keep last 10

    const newContent = {
      ...content,
      metadata: {
        ...content.metadata,
        version: current.metadata.version + 1,
        updatedAt: new Date().toISOString()
      }
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newContent));
    return newContent;
  }

  async getHistory(): Promise<PlatformContent[]> {
    const data = localStorage.getItem(this.HISTORY_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as PlatformContent[];
    } catch {
      return [];
    }
  }
}
