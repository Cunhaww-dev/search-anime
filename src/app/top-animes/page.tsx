"use client";

import { useState, useEffect } from "react";
import AnimeList from "@/components/organisms/animeList";
import { useAnimes } from "@/hooks/useAnimes";
import { useSearch } from "@/contexts/searchContext";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination, DOTS } from "@/hooks/usePagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PageLayout } from "@/components/templates/pageLayout";

export default function TopAnimesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { searchTerm } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: response,
    isLoading,
    error,
  } = useAnimes({
    page: currentPage,
    limit: itemsPerPage,
    options: debouncedSearchTerm ? { query: debouncedSearchTerm } : {},
  });

  const topAnimes = response?.data || [];
  const paginationInfo = response?.pagination;

  useEffect(() => {
    if (debouncedSearchTerm) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginationRange = usePagination({
    currentPage: paginationInfo?.current_page || 1,
    totalCount: paginationInfo?.items?.total || 0,
    pageSize: itemsPerPage,
  });

  const pageTitle = "Top Animes";
  const pageDescription = "Os animes mais bem avaliados de todos os tempos.";

  if (isLoading) {
    return (
      <PageLayout title={pageTitle} description={pageDescription}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full aspect-[2/3] rounded-lg bg-gray-700"
            />
          ))}
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title={pageTitle} description={pageDescription}>
        <div className="text-red-400 text-center">
          Erro ao carregar os animes. Tente novamente mais tarde.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={pageTitle}
      description={pageDescription}
      headerContent={
        paginationInfo && (
          <p className="pt-10 text-sm text-gray-400">
            Página {paginationInfo.current_page} de{" "}
            {paginationInfo.last_visible_page}
            {paginationInfo.items && (
              <span> • {paginationInfo.items.total} animes no total</span>
            )}
          </p>
        )
      }
    >
      <AnimeList animes={topAnimes} />

      {paginationInfo && paginationInfo.last_visible_page > 1 && (
        <div className="mt-12 mb-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {paginationRange?.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                  return (
                    <PaginationItem key={`${DOTS}-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      variant="purple"
                      isActive={pageNumber === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber as number);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (paginationInfo.has_next_page)
                      handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </PageLayout>
  );
}
