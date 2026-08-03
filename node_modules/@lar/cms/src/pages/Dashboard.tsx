import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  FileEdit, 
  Star,
  Plus,
  Settings,
  ExternalLink,
  Activity
} from 'lucide-react';
import { ApiPropertyRepository, DashboardStatsUseCase } from '@lar/shared';
import type { DashboardStats } from '@lar/shared';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';

// For now, we instantiate the repository directly in the component.
// In a larger app, this would be injected via a Dependency Injection container or React Context.
const repository = new ApiPropertyRepository();
const dashboardUseCase = new DashboardStatsUseCase(repository);

const MOCK_ACTIVITIES = [
  { id: 1, action: 'João publicou', target: 'Residencial Aurora', time: 'há 5 minutos' },
  { id: 2, action: 'Maria editou', target: 'Vista Bela', time: 'há 18 minutos' },
  { id: 3, action: 'Residencial Sol', target: 'foi duplicado', time: 'há 1 hora' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await dashboardUseCase.execute();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = useMemo(() => {
    if (!stats) return [];
    return [
      { title: 'Total de Imóveis', value: stats.totalProperties, icon: Building2, color: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-50 dark:bg-secondary-900/40' },
      { title: 'Publicados', value: stats.published, icon: CheckCircle2, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/30' },
      { title: 'Rascunhos', value: stats.drafts, icon: FileEdit, color: 'text-neutral-500 dark:text-neutral-400', bg: 'bg-neutral-200 dark:bg-neutral-800' },
      { title: 'Destaques', value: stats.featured, icon: Star, color: 'text-accent-DEFAULT', bg: 'bg-accent-light/20' },
    ];
  }, [stats]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Visão geral do seu portfólio de imóveis.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/configuracoes')}>
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          <Button onClick={() => navigate('/imoveis/novo')}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Imóvel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center gap-4">
                  <Skeleton className="w-14 h-14 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))
          : statCards.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse as funcionalidades mais utilizadas do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/imoveis/novo')}>
                  <Plus className="w-6 h-6 text-primary-500" />
                  <span>Cadastrar Novo Imóvel</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <ExternalLink className="w-6 h-6 text-secondary-500" />
                  <span>Ver Site Publicado</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary-500" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
                      <div className="absolute left-1 top-3 bottom-[-24px] w-px bg-neutral-200 dark:bg-neutral-800 last-of-type:hidden"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900 dark:text-neutral-100">
                        <span className="font-semibold">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
