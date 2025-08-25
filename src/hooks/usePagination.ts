import { useMemo } from "react";

export const DOTS = "...";

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // O número de itens na paginação é: 1 (página atual) + 2*siblingCount + 2 (reticências) + 2 (primeira/última página)
    const totalPageNumbers = siblingCount + 5;

    // Caso 1: Se o número total de páginas é menor que os itens que queremos mostrar, simplesmente retornamos todas as páginas.
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Caso 2: Sem reticências à esquerda, mas com reticências à direita.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // Caso 3: Com reticências à esquerda, mas sem reticências à direita.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Caso 4: Com reticências em ambos os lados.
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    // Fallback caso alguma lógica falhe (não deve acontecer)
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
