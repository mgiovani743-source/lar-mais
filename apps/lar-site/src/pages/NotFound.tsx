import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <title>Página não encontrada | Lar+</title>
      </Helmet>
      
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <Search className="w-16 h-16 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
        Imóvel não encontrado
      </h1>
      
      <p className="text-lg text-neutral-600 max-w-md mb-8">
        A página ou imóvel que você está procurando pode ter sido removido, 
        vendido, ou o link está incorreto.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/imoveis" 
          className="bg-primary hover:bg-primary/90 text-secondary-900 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Ver todos os imóveis
        </Link>
        
        <Link 
          to="/" 
          className="bg-white border border-neutral-200 hover:border-secondary-500 hover:text-secondary-500 text-neutral-700 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
