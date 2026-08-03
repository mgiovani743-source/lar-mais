export interface VersionMetadata {
  version: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface PlatformBrand {
  name: string;
  logoDark: string;
  logoLight: string;
  logoReduced: string;
  iconSquare: string;
  placeholder: string;
}

export interface PlatformAppearance {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  background: string;
  foreground: string;
  muted: string;
}

export interface PlatformContact {
  mainPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  businessHours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
}

export interface PlatformSEO {
  globalTitle: string;
  globalDescription: string;
  keywords: string[];
  ogImage: string;
  robots: string;
  canonical: string;
  schemaOrgEnabled: boolean;
  organizationJsonLd: string; // Stringified JSON
}

export interface PlatformIntegrations {
  googleAnalyticsId: string;
  metaPixelId: string;
  googleTagManagerId: string;
  hotjarId: string;
  clarityId: string;
}

export interface PlatformSettings {
  brand: PlatformBrand;
  appearance: PlatformAppearance;
  contact: PlatformContact;
  seo: PlatformSEO;
  integrations: PlatformIntegrations;
  metadata: VersionMetadata;
}

export interface HomepageSection {
  id: string; // e.g., 'hero', 'featured', 'institutional', 'numbers'
  type: string; 
  active: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  link?: string;
  linkText?: string;
}

export interface PlatformInstitutionalPage {
  aboutUs: string;
  history: string;
  mission: string;
  vision: string;
  values: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; url: string }>;
}

export interface PlatformFooter {
  institutionalText: string;
  copyright: string;
  columns: FooterColumn[];
}

export interface PromoBanner {
  active: boolean;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
  position: 'top' | 'bottom';
}

export interface FloatingCTA {
  whatsappActive: boolean;
  whatsappMessage: string;
  simulationActive: boolean;
  simulationButtonText: string;
}

export interface PlatformContent {
  homepageSections: HomepageSection[];
  institutional: PlatformInstitutionalPage;
  footer: PlatformFooter;
  promoBanner: PromoBanner;
  floatingCta: FloatingCTA;
  metadata: VersionMetadata;
}
