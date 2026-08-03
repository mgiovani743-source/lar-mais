import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Home, FileText, LayoutPanelTop, MonitorPlay, Save, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Skeleton } from '../components/ui/Skeleton';
import { toast } from 'sonner';
import { PlatformContentService, LocalPlatformContentRepository } from '@lar/shared';
import type { PlatformContent } from '@lar/shared';

const repository = new LocalPlatformContentRepository();
const contentService = new PlatformContentService(repository);

const TABS = [
  { id: 'homepage', label: 'Página Inicial (Home)', icon: Home },
  { id: 'institutional', label: 'Página Institucional', icon: FileText },
  { id: 'footer', label: 'Rodapé (Footer)', icon: LayoutPanelTop },
  { id: 'promo', label: 'Banners & CTA', icon: MonitorPlay },
];

export function Content() {
  const [activeTab, setActiveTab] = useState('homepage');
  const [content, setContent] = useState<PlatformContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    contentService.getContent().then(data => {
      setContent(data);
      setIsLoading(false);
    });
  }, []);

  const updateField = (section: keyof PlatformContent, field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...(content[section] as any),
        [field]: value
      }
    } as any);
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      await contentService.updateContent(content);
      toast.success('Conteúdo salvo com sucesso');
    } catch (error) {
      toast.error('Erro ao salvar conteúdo');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('http://localhost:3001', '_blank');
  };

  if (isLoading || !content) {
    return <div className="p-12 text-center"><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">Conteúdo do Site</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">
            Gerencie os blocos, textos e seções das páginas do site. (v{content.metadata.version})
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
              <CardDescription>Atualize o conteúdo relacionado a esta seção.</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'homepage' && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                  <p className="text-sm text-neutral-500 mb-4">Gerencie as seções que aparecem na página inicial. A ordem define a exibição no site.</p>
                  
                  {content.homepageSections.map((section, idx) => (
                    <div key={section.id} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 capitalize">Bloco: {section.id}</h4>
                        <div className="flex items-center gap-4">
                          <label className="text-sm">Ordem:</label>
                          <Input 
                            type="number" 
                            className="w-20 h-8"
                            value={section.order} 
                            onChange={(e) => {
                              const newSections = [...content.homepageSections];
                              newSections[idx].order = Number(e.target.value);
                              setContent({ ...content, homepageSections: newSections });
                            }} 
                          />
                          <Checkbox 
                            checked={section.active} 
                            onChange={(e) => {
                              const newSections = [...content.homepageSections];
                              newSections[idx].active = e.target.checked;
                              setContent({ ...content, homepageSections: newSections });
                            }} 
                            label="Ativo"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-500 mb-1">Título</label>
                          <Input 
                            value={section.title || ''} 
                            onChange={(e) => {
                              const newSections = [...content.homepageSections];
                              newSections[idx].title = e.target.value;
                              setContent({ ...content, homepageSections: newSections });
                            }} 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-neutral-500 mb-1">Subtítulo</label>
                          <Input 
                            value={section.subtitle || ''} 
                            onChange={(e) => {
                              const newSections = [...content.homepageSections];
                              newSections[idx].subtitle = e.target.value;
                              setContent({ ...content, homepageSections: newSections });
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'institutional' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Quem Somos</label>
                    <textarea 
                      className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[120px]" 
                      value={content.institutional.aboutUs} onChange={e => updateField('institutional', 'aboutUs', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Nossa História</label>
                    <textarea 
                      className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[120px]" 
                      value={content.institutional.history} onChange={e => updateField('institutional', 'history', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Missão</label>
                      <textarea className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[100px]" value={content.institutional.mission} onChange={e => updateField('institutional', 'mission', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Visão</label>
                      <textarea className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[100px]" value={content.institutional.vision} onChange={e => updateField('institutional', 'vision', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Valores</label>
                      <textarea className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[100px]" value={content.institutional.values} onChange={e => updateField('institutional', 'values', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'footer' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Texto Institucional (Rodapé)</label>
                    <textarea 
                      className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm min-h-[80px]" 
                      value={content.footer.institutionalText} onChange={e => updateField('footer', 'institutionalText', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Copyright</label>
                    <Input value={content.footer.copyright} onChange={e => updateField('footer', 'copyright', e.target.value)} />
                  </div>
                </div>
              )}

              {activeTab === 'promo' && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                  <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Banner Promocional</h4>
                      <Checkbox checked={content.promoBanner.active} onChange={e => updateField('promoBanner', 'active', e.target.checked)} label="Ativo" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Título..." value={content.promoBanner.title} onChange={e => updateField('promoBanner', 'title', e.target.value)} />
                      <Input placeholder="Link de Destino..." value={content.promoBanner.link} onChange={e => updateField('promoBanner', 'link', e.target.value)} />
                    </div>
                  </div>

                  <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">WhatsApp Flutuante</h4>
                      <Checkbox checked={content.floatingCta.whatsappActive} onChange={e => updateField('floatingCta', 'whatsappActive', e.target.checked)} label="Ativo" />
                    </div>
                    <div>
                      <Input placeholder="Mensagem padrão (ex: Olá, vim pelo site)..." value={content.floatingCta.whatsappMessage} onChange={e => updateField('floatingCta', 'whatsappMessage', e.target.value)} />
                    </div>
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
