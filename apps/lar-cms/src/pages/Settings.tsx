import React, { useState, useEffect } from 'react';
import { Building2, Search, Phone, Paintbrush, Link2, ExternalLink, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Skeleton } from '../components/ui/Skeleton';
import { toast } from 'sonner';
import { PlatformSettingsService, LocalPlatformSettingsRepository } from '@lar/shared';
import type { PlatformSettings } from '@lar/shared';

const repository = new LocalPlatformSettingsRepository();
const settingsService = new PlatformSettingsService(repository);

const TABS = [
  { id: 'brand', label: 'Marca & Identidade', icon: Building2 },
  { id: 'appearance', label: 'Aparência (Cores)', icon: Paintbrush },
  { id: 'contact', label: 'Contato', icon: Phone },
  { id: 'seo', label: 'SEO Global', icon: Search },
  { id: 'integrations', label: 'Integrações', icon: Link2 },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('brand');
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    settingsService.getSettings().then(data => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const updateField = (section: keyof PlatformSettings, field: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: {
        ...(settings[section] as any),
        [field]: value
      }
    } as any);
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      await settingsService.updateSettings(settings);
      toast.success('Configurações salvas com sucesso');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('http://localhost:3001', '_blank');
  };

  if (isLoading || !settings) {
    return <div className="p-12 text-center"><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">Configurações da Plataforma</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">
            Última alteração: {new Date(settings.metadata.updatedAt).toLocaleString()} (v{settings.metadata.version})
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePreview}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Visualizar Site
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-secondary-900 text-white shadow-medium dark:bg-secondary-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-secondary-100' : 'text-neutral-400'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle>{TABS.find(t => t.id === activeTab)?.label}</CardTitle>
              <CardDescription>Atualize as informações relacionadas a esta seção.</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'brand' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Nome do Tenant (Plataforma)</label>
                    <Input value={settings.brand.name} onChange={e => updateField('brand', 'name', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Logo (Versão Clara)</label>
                      <Input value={settings.brand.logoLight} onChange={e => updateField('brand', 'logoLight', e.target.value)} placeholder="URL da logo..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Logo (Versão Escura)</label>
                      <Input value={settings.brand.logoDark} onChange={e => updateField('brand', 'logoDark', e.target.value)} placeholder="URL da logo..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Ícone / Favicon</label>
                      <Input value={settings.brand.iconSquare} onChange={e => updateField('brand', 'iconSquare', e.target.value)} placeholder="URL do ícone quadrado..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Imagem de Placeholder</label>
                      <Input value={settings.brand.placeholder} onChange={e => updateField('brand', 'placeholder', e.target.value)} placeholder="URL do placeholder padrão..." />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <p className="text-sm text-neutral-500 mb-4">Estas cores são convertidas em variáveis CSS dinâmicas injetadas na raiz do site público.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {Object.entries(settings.appearance).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 capitalize">{key}</label>
                        <div className="flex gap-2">
                          <Input value={value} onChange={e => updateField('appearance', key, e.target.value)} />
                          <div className="w-12 h-12 rounded-xl border border-neutral-200" style={{ backgroundColor: value }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">WhatsApp</label>
                      <Input value={settings.contact.whatsapp} onChange={e => updateField('contact', 'whatsapp', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Telefone Principal</label>
                      <Input value={settings.contact.mainPhone} onChange={e => updateField('contact', 'mainPhone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">E-mail</label>
                    <Input value={settings.contact.email} onChange={e => updateField('contact', 'email', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Endereço Físico</label>
                    <Input value={settings.contact.address} onChange={e => updateField('contact', 'address', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Instagram</label>
                      <Input value={settings.contact.instagram} onChange={e => updateField('contact', 'instagram', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">LinkedIn</label>
                      <Input value={settings.contact.linkedin} onChange={e => updateField('contact', 'linkedin', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Título Global SEO</label>
                    <Input value={settings.seo.globalTitle} onChange={e => updateField('seo', 'globalTitle', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Descrição Global SEO</label>
                    <textarea 
                      className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 min-h-[80px]" 
                      value={settings.seo.globalDescription} onChange={e => updateField('seo', 'globalDescription', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">OG Image URL</label>
                    <Input value={settings.seo.ogImage} onChange={e => updateField('seo', 'ogImage', e.target.value)} />
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox checked={settings.seo.schemaOrgEnabled} onChange={e => updateField('seo', 'schemaOrgEnabled', e.target.checked)} />
                      <span className="text-sm font-medium">Habilitar Schema.org JSON-LD</span>
                    </label>
                  </div>
                  {settings.seo.schemaOrgEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Organization JSON-LD</label>
                      <textarea 
                        className="flex w-full font-mono text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-neutral-50 shadow-sm focus-visible:outline-none min-h-[120px]" 
                        value={settings.seo.organizationJsonLd} onChange={e => updateField('seo', 'organizationJsonLd', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Google Analytics (ID)</label>
                    <Input value={settings.integrations.googleAnalyticsId} onChange={e => updateField('integrations', 'googleAnalyticsId', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Meta Pixel (ID)</label>
                    <Input value={settings.integrations.metaPixelId} onChange={e => updateField('integrations', 'metaPixelId', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Google Tag Manager</label>
                    <Input value={settings.integrations.googleTagManagerId} onChange={e => updateField('integrations', 'googleTagManagerId', e.target.value)} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
