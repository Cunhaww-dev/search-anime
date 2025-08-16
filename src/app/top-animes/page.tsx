"use client";

import { useState } from "react";
import AnimeList from "@/components/organisms/animeList";
import { useTopAnimes } from "@/hooks/useTopAnimes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TopAnimesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const { data: response, isLoading, error } = useTopAnimes(currentPage, itemsPerPage);
  
  const topAnimes = response?.data || [];
  const pagination = response?.pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll para o topo da página ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    if (!pagination) return null;

    const items = [];
    const totalPages = pagination.last_visible_page;
    const current = pagination.current_page;

    // Sempre mostrar primeira página
    if (current > 3) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (current > 4) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Páginas ao redor da página atual
    const startPage = Math.max(1, current - 2);
    const endPage = Math.min(totalPages, current + 2);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === current}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Sempre mostrar última página
    if (current < totalPages - 2) {
      if (current < totalPages - 3) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  if (isLoading) {
    return (
      <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <header className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Top Animes
            </h1>
            <p className="text-gray-400 mt-2">
              Os animes mais bem avaliados de todos os tempos.
            </p>
          </header>
          <div className="text-white text-center">Carregando...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <header className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Top Animes
            </h1>
            <p className="text-gray-400 mt-2">
              Os animes mais bem avaliados de todos os tempos.
            </p>
          </header>
          <div className="text-red-400 text-center">
            Erro ao carregar os animes. Tente novamente mais tarde.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Top Animes
          </h1>
          <p className="text-gray-400 mt-2">
            Os animes mais bem avaliados de todos os tempos.
          </p>
          {pagination && (
            <p className="text-gray-500 text-sm mt-1">
              Página {pagination.current_page} de {pagination.last_visible_page} 
              {pagination.items && (
                <span> • {pagination.items.total} animes no total</span>
              )}
            </p>
          )}
        </header>

        <AnimeList animes={topAnimes} />

        {/* Componente de Paginação */}
        {pagination && pagination.last_visible_page > 1 && (
          <div className="mt-12 mb-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.current_page > 1) {
                        handlePageChange(pagination.current_page - 1);
                      }
                    }}
                    className={
                      pagination.current_page <= 1 
                        ? "pointer-events-none opacity-50" 
                        : "text-white hover:text-gray-300"
                    }
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.has_next_page) {
                        handlePageChange(pagination.current_page + 1);
                      }
                    }}
                    className={
                      !pagination.has_next_page 
                        ? "pointer-events-none opacity-50" 
                        : "text-white hover:text-gray-300"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}

