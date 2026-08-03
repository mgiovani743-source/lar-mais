import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { PropertyList } from './pages/PropertyList';
import { PropertyWizard } from './pages/PropertyWizard';
import { Settings } from './pages/Settings';
import { Content } from './pages/Content';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="lar-cms-theme">
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="imoveis" element={<PropertyList />} />
            <Route path="imoveis/novo" element={<PropertyWizard />} />
            <Route path="imoveis/:id/editar" element={<PropertyWizard />} />
            <Route path="conteudo/*" element={<Content />} />
            <Route path="configuracoes/*" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
