import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Check, X, Image as ImageIcon, UploadCloud, Trash2, GripVertical } from 'lucide-react';
import { ApiPropertyRepository, PropertyAppService, PropertyStatus } from '@lar/shared';
import type { CreatePropertyDTO, PropertyImage, Amenity, Highlight } from '@lar/shared';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Card, CardContent } from '../components/ui/Card';
import { toast } from 'sonner';

const repository = new ApiPropertyRepository();
const appService = new PropertyAppService(repository);

const STEPS = [
  'Informações Gerais',
  'Financeiro',
  'Localização',
  'Características',
  'Amenidades',
  'Galeria',
  'SEO',
  'Publicação'
];

const AUTOSAVE_KEY = 'lar_cms_property_draft';

const defaultFormState: Partial<CreatePropertyDTO> = {
  title: '', shortDescription: '', fullDescription: '', priceFrom: 0,
  acceptsFGTS: false, mcmvEligible: false, city: '', state: '',
  neighborhood: '', bedrooms: 0, bathrooms: 0, parkingSpaces: 0,
  privateArea: 0, amenities: [], highlights: [], gallery: [],
  status: PropertyStatus.AVAILABLE, published: false, featured: false,
  displayOrder: 0, seo: { title: '', description: '' }
};

export function PropertyWizard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutosaving, setIsAutosaving] = useState(false);

  const [formData, setFormData] = useState<Partial<CreatePropertyDTO>>(defaultFormState);

  useEffect(() => {
    if (isEditing) {
      appService.getProperty(id!).then(data => {
        if (data) setFormData(data);
        setIsLoading(false);
      });
    } else {
      const savedDraft = localStorage.getItem(AUTOSAVE_KEY);
      if (savedDraft) {
        if (confirm('Encontramos um rascunho salvo. Deseja restaurá-lo?')) {
          setFormData(JSON.parse(savedDraft));
          toast.success('Rascunho restaurado');
        } else {
          localStorage.removeItem(AUTOSAVE_KEY);
        }
      }
      setIsLoading(false);
    }
  }, [id, isEditing]);

  // Autosave effect
  useEffect(() => {
    if (isEditing || isLoading) return; // Don't autosave when editing an existing one for now, or while loading

    const timeoutId = setTimeout(() => {
      setIsAutosaving(true);
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(formData));
      setTimeout(() => setIsAutosaving(false), 500); // Visual effect
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData, isEditing, isLoading]);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 2) {
        return { ...prev, [keys[0]]: { ...prev[keys[0] as keyof typeof prev] as any, [keys[1]]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isEditing) {
        await appService.updateProperty(id!, formData as any);
        toast.success('Imóvel atualizado com sucesso');
      } else {
        await appService.createProperty(formData as CreatePropertyDTO);
        localStorage.removeItem(AUTOSAVE_KEY);
        toast.success('Imóvel criado com sucesso');
      }
      navigate('/imoveis');
    } catch (error) {
      toast.error('Erro ao salvar imóvel. Verifique os campos.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-neutral-500 animate-pulse">Carregando dados...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">
            {isEditing ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">
            {isAutosaving ? 'Salvando rascunho...' : 'Siga as etapas para concluir o cadastro.'}
          </p>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="glass-card p-4 rounded-xl flex items-center justify-between overflow-x-auto gap-4">
        {STEPS.map((step, index) => (
          <div key={index} className={`flex items-center gap-2 whitespace-nowrap ${index === currentStep ? 'text-secondary-600 dark:text-secondary-400 font-bold' : 'text-neutral-400 dark:text-neutral-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${index === currentStep ? 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/50 dark:text-secondary-400' : index < currentStep ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'}`}>
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className="hidden sm:inline">{step}</span>
            {index < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-700 mx-2 hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="min-h-[400px]">
        <CardContent className="p-8">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Informações Gerais</h2>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Título do Imóvel</label>
                <Input value={formData.title} onChange={e => updateForm('title', e.target.value)} placeholder="Ex: Residencial Parque dos Pássaros" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Descrição Curta (Resumo)</label>
                <Input value={formData.shortDescription} onChange={e => updateForm('shortDescription', e.target.value)} placeholder="Um breve resumo atrativo..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Descrição Completa</label>
                <textarea 
                  className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 min-h-[120px]" 
                  value={formData.fullDescription} 
                  onChange={e => updateForm('fullDescription', e.target.value)} 
                  placeholder="Detalhes do imóvel..." 
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Financeiro</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Preço A Partir De (R$)</label>
                  <Input type="number" value={formData.priceFrom} onChange={e => updateForm('priceFrom', Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Preço Até (R$)</label>
                  <Input type="number" value={formData.priceTo || ''} onChange={e => updateForm('priceTo', Number(e.target.value))} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Estimativa de Entrada (R$)</label>
                  <Input type="number" value={formData.estimatedDownpayment || ''} onChange={e => updateForm('estimatedDownpayment', Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Estimativa de Parcela (R$)</label>
                  <Input type="number" value={formData.estimatedInstallment || ''} onChange={e => updateForm('estimatedInstallment', Number(e.target.value))} />
                </div>
              </div>

              <div className="flex gap-8 mt-6">
                <Checkbox label="Aceita FGTS" checked={formData.acceptsFGTS} onChange={e => updateForm('acceptsFGTS', e.target.checked)} />
                <Checkbox label="Minha Casa Minha Vida" checked={formData.mcmvEligible} onChange={e => updateForm('mcmvEligible', e.target.checked)} />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Localização</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Cidade</label>
                  <Input value={formData.city} onChange={e => updateForm('city', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Estado (UF)</label>
                  <Input maxLength={2} className="uppercase" value={formData.state} onChange={e => updateForm('state', e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Bairro</label>
                <Input value={formData.neighborhood} onChange={e => updateForm('neighborhood', e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Endereço Completo</label>
                <Input value={formData.address || ''} onChange={e => updateForm('address', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Características Físicas</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Quartos</label>
                  <Input type="number" value={formData.bedrooms} onChange={e => updateForm('bedrooms', Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Banheiros</label>
                  <Input type="number" value={formData.bathrooms} onChange={e => updateForm('bathrooms', Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Vagas</label>
                  <Input type="number" value={formData.parkingSpaces} onChange={e => updateForm('parkingSpaces', Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Área (m²)</label>
                  <Input type="number" value={formData.privateArea} onChange={e => updateForm('privateArea', Number(e.target.value))} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Amenidades (Condomínio)</h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Selecione os diferenciais do imóvel.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <Checkbox label="Piscina" />
                <Checkbox label="Academia" />
                <Checkbox label="Churrasqueira" />
                <Checkbox label="Salão de Festas" />
                <Checkbox label="Playground" />
                <Checkbox label="Quadra Poliesportiva" />
                <Checkbox label="Portaria 24h" />
                <Checkbox label="Elevador" />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Galeria de Fotos</h2>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Selecionadas
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-12 rounded-xl flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group">
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-primary-500" />
                </div>
                <p className="font-bold text-neutral-700 dark:text-neutral-300">Clique para upload ou arraste as imagens</p>
                <p className="text-sm mt-1">PNG, JPG ou WEBP (Max. 5MB)</p>
              </div>

              {formData.gallery && formData.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {formData.gallery.map((img, idx) => (
                    <div key={img.id} className="group relative aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-lg text-white transition-colors" title="Mover">
                          <GripVertical className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-lg text-white transition-colors" title="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-primary-500 text-secondary-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                          Capa
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Metadados e SEO</h2>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Título SEO</label>
                <Input value={formData.seo?.title || ''} onChange={e => updateForm('seo.title', e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Descrição SEO</label>
                <textarea 
                  className="flex w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 min-h-[100px]" 
                  value={formData.seo?.description || ''} 
                  onChange={e => updateForm('seo.description', e.target.value)} 
                />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Publicação</h2>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Status da Obra</label>
                <select 
                  className="flex h-12 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500" 
                  value={formData.status} 
                  onChange={e => updateForm('status', e.target.value)}
                >
                  <option value={PropertyStatus.LAUNCH}>Lançamento</option>
                  <option value={PropertyStatus.CONSTRUCTION}>Em obras</option>
                  <option value={PropertyStatus.READY}>Pronto para morar</option>
                  <option value={PropertyStatus.AVAILABLE}>Disponível</option>
                  <option value={PropertyStatus.SOLD}>Vendido</option>
                </select>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="mt-1"><Checkbox checked={formData.published} onChange={e => updateForm('published', e.target.checked)} /></div>
                  <div>
                    <span className="block font-bold text-secondary-900 dark:text-white">Imóvel Publicado</span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 block">Exibir este imóvel para os visitantes do site.</span>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="mt-1"><Checkbox checked={formData.featured} onChange={e => updateForm('featured', e.target.checked)} /></div>
                  <div>
                    <span className="block font-bold text-secondary-900 dark:text-white">Destaque na Home</span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 block">Colocar este imóvel em evidência na página inicial.</span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button 
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button onClick={nextStep} variant="secondary">
            Próximo <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSave} isLoading={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Atualizar Imóvel' : 'Publicar Imóvel'}
          </Button>
        )}
      </div>
    </div>
  );
}
