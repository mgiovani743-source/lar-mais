import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex relative transition-colors duration-300">
      {/* Decorative background blur */}
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
