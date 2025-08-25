"use client";

import { AnimeCarouselRow } from "@/components/organisms/animeCarousel";
import { useAnimes } from "@/hooks/useAnimes";

export default function HomePage() {
  const { data: topAnimesResponse, isLoading: isLoadingTop } = useAnimes({
    limit: 10,
  });

  const { data: actionAnimesResponse, isLoading: isLoadingAction } = useAnimes({
    limit: 10,
    options: { genreId: 1 },
  });

  const { data: seasonAnimesResponse, isLoading: isLoadingSeason } = useAnimes({
    limit: 10,
    options: { season: "now" },
  });

  return (
    <main className="w-full py-8 px-20 space-y-16 bg-gray-900">
      <AnimeCarouselRow
        title="Top Animes Populares"
        animes={topAnimesResponse?.data || []}
        isLoading={isLoadingTop}
      />

      <AnimeCarouselRow
        title="Mergulhe na próxima Ação"
        animes={actionAnimesResponse?.data || []}
        isLoading={isLoadingAction}
      />

      <AnimeCarouselRow
        title="Em Alta na Temporada"
        animes={seasonAnimesResponse?.data || []}
        isLoading={isLoadingSeason}
      />
    </main>
  );
}
