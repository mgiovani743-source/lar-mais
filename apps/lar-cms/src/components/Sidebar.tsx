import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Settings, LogOut, LayoutTemplate } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Imóveis', path: '/imoveis', icon: Building2 },
    { name: 'Conteúdo do Site', path: '/conteudo', icon: LayoutTemplate },
    { name: 'Configurações', path: '/configuracoes', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen glass-panel border-r border-white/40 dark:border-neutral-800 flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-white/20 dark:border-neutral-800">
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white tracking-tight">
          Lar+ <span className="text-primary-500">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                  isActive
                    ? 'bg-secondary-500 text-white shadow-md shadow-secondary-500/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-neutral-800/60 hover:text-secondary-600 dark:hover:text-white'
                )
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/20 dark:border-neutral-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-neutral-500 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
