import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Building2, Edit, Trash2, Copy, MoreVertical, LayoutGrid, Eye, EyeOff, Star, Trash } from 'lucide-react';
import { ApiPropertyRepository, PropertyAppService, DuplicatePropertyUseCase } from '@lar/shared';
import type { Property } from '@lar/shared';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Checkbox } from '../components/ui/Checkbox';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../components/ui/DropdownMenu';
import { toast } from 'sonner';

const repository = new ApiPropertyRepository();
const appService = new PropertyAppService(repository);
const duplicateUseCase = new DuplicatePropertyUseCase(repository);

export function PropertyList() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [density, setDensity] = useState<'compact' | 'medium' | 'comfortable'>('medium');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setIsLoading(true);
    try {
      const data = await appService.listProperties();
      setProperties(data);
    } catch (error) {
      toast.error('Falha ao carregar imóveis');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDuplicate(id: string) {
    try {
      await duplicateUseCase.execute(id, 'admin');
      toast.success('Imóvel duplicado com sucesso');
      await loadProperties();
    } catch (error) {
      toast.error('Erro ao duplicar o imóvel');
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir? Esta ação é irreversível.')) {
      try {
        await appService.deleteProperty(id);
        toast.success('Imóvel excluído');
        setSelectedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        await loadProperties();
      } catch (error) {
        toast.error('Erro ao excluir imóvel');
      }
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProperties.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProperties.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkAction = (action: string) => {
    toast.success(`${selectedIds.size} imóveis atualizados (Mock)`);
    setSelectedIds(new Set());
  };

  const filteredProperties = properties.filter(p => {
    const search = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(search) ||
      p.neighborhood.toLowerCase().includes(search) ||
      p.city.toLowerCase().includes(search) ||
      p.slug.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">Imóveis</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Gerencie seu portfólio de propriedades.</p>
        </div>
        <Button onClick={() => navigate('/imoveis/novo')} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Novo Imóvel
        </Button>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[280px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <Input 
            placeholder="Buscar por título, bairro, cidade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-white dark:bg-neutral-900"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
            <button onClick={() => setDensity('compact')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${density === 'compact' ? 'bg-white dark:bg-neutral-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}>Compacta</button>
            <button onClick={() => setDensity('medium')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${density === 'medium' ? 'bg-white dark:bg-neutral-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}>Média</button>
            <button onClick={() => setDensity('comfortable')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${density === 'comfortable' ? 'bg-white dark:bg-neutral-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}>Confortável</button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="glass-card p-3 rounded-xl flex items-center justify-between bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-bold text-secondary-900 dark:text-white px-3">
            {selectedIds.size} imóveis selecionados
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleBulkAction('publish')} className="text-primary-700 dark:text-primary-400">
              <Eye className="w-4 h-4 mr-2" /> Publicar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleBulkAction('unpublish')} className="text-neutral-600 dark:text-neutral-400">
              <EyeOff className="w-4 h-4 mr-2" /> Ocultar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleBulkAction('highlight')} className="text-accent-DEFAULT">
              <Star className="w-4 h-4 mr-2" /> Destacar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleBulkAction('delete')} className="text-red-600 dark:text-red-400">
              <Trash className="w-4 h-4 mr-2" /> Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <Table density={density}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="w-4 h-4 rounded" /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-12 rounded-lg" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="w-24 h-4" /></TableCell>
                <TableCell><Skeleton className="w-20 h-4" /></TableCell>
                <TableCell><Skeleton className="w-16 h-6 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="w-8 h-8 rounded-lg ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : filteredProperties.length === 0 ? (
        <EmptyState 
          icon={Building2}
          title={searchTerm ? "Nenhum imóvel encontrado" : "Nenhum imóvel cadastrado"}
          description={searchTerm ? "Tente ajustar os filtros da sua busca." : "Comece adicionando seu primeiro imóvel ao portfólio."}
          action={!searchTerm && (
            <Button onClick={() => navigate('/imoveis/novo')}>
              <Plus className="w-4 h-4 mr-2" />
              Criar primeiro imóvel
            </Button>
          )}
        />
      ) : (
        <Table density={density}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedIds.size > 0 && selectedIds.size === filteredProperties.length}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map(property => {
              const coverImage = property.gallery.find(img => img.cover)?.url || property.gallery[0]?.url;
              return (
                <TableRow key={property.id} data-state={selectedIds.has(property.id) ? 'selected' : undefined}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.has(property.id)}
                      onChange={() => toggleSelect(property.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      {coverImage ? (
                        <img src={coverImage} alt={property.title} className="w-16 h-12 rounded-lg object-cover bg-neutral-200" />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-secondary-900 dark:text-neutral-100 line-clamp-1">{property.title}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{property.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-neutral-900 dark:text-neutral-100">{property.neighborhood}</p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">{property.city} - {property.state}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-secondary-900 dark:text-neutral-100">
                      R$ {property.priceFrom.toLocaleString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={property.published ? 'success' : 'draft'}>
                        {property.published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      {property.featured && <Badge variant="primary">Destaque</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger onClick={() => setOpenDropdown(openDropdown === property.id ? null : property.id)}>
                        <div className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent isOpen={openDropdown === property.id} onClose={() => setOpenDropdown(null)}>
                        <DropdownMenuItem onClick={() => navigate(`/imoveis/${property.id}/editar`)}>
                          <Edit className="w-4 h-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(property.id)}>
                          <Copy className="w-4 h-4 mr-2" /> Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(property.id)} destructive>
                          <Trash2 className="w-4 h-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
