import { useState, useEffect } from 'react';
import { PlatformSettingsService, PlatformContentService, LocalPlatformSettingsRepository, LocalPlatformContentRepository } from '@lar/shared';
import type { PlatformSettings, PlatformContent } from '@lar/shared';

const settingsRepository = new LocalPlatformSettingsRepository();
const contentRepository = new LocalPlatformContentRepository();

export const settingsService = new PlatformSettingsService(settingsRepository);
export const contentService = new PlatformContentService(contentRepository);

export function usePlatformConfig() {
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [content, setContent] = useState<PlatformContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, c] = await Promise.all([
          settingsService.getSettings(),
          contentService.getContent()
        ]);
        setSettings(s);
        setContent(c);
        
        // Inject CSS Variables dynamically
        const root = document.documentElement;
        Object.entries(s.appearance).forEach(([key, value]) => {
          if (value && typeof value === 'string') {
            root.style.setProperty(`--${key}`, value);
          }
        });
        
        // Basic SEO injection
        if (s.seo.globalTitle) document.title = s.seo.globalTitle;
        if (s.seo.globalDescription) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', s.seo.globalDescription);
        }

        // JSON-LD injection
        if (s.seo.schemaOrgEnabled && s.seo.organizationJsonLd) {
          let script = document.querySelector('#json-ld-organization');
          if (!script) {
            script = document.createElement('script');
            script.id = 'json-ld-organization';
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
          }
          script.textContent = s.seo.organizationJsonLd;
        }
        
      } catch (error) {
        console.error('Failed to load platform config', error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { settings, content, isLoading };
}
