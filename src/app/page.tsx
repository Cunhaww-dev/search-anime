"use client";

import { Skeleton } from "@/components/ui/skeleton";
import AnimeList from "@/components/organisms/animeList";
import { useAnimes } from "@/hooks/useAnimes";

export default function HomePage() {
  // --- CHAMADA 1: TOP ANIMES ---
  // Usamos o hook pela primeira vez, sem passar nenhuma opção especial.
  // Pedimos apenas 10 itens (limit: 10).
  const { data: topAnimesResponse, isLoading: isLoadingTop } = useAnimes({
    limit: 10,
  });

  // --- CHAMADA 2: ANIMES DE AÇÃO ---
  // Usamos o hook pela segunda vez. Agora, passamos a opção 'genreId'.
  // O hook vai ver o 'genreId' e saber que precisa buscar animes de Ação.
  const { data: actionAnimesResponse, isLoading: isLoadingAction } = useAnimes({
    limit: 10,
    options: { genreId: 1 }, // ID do gênero "Ação" na API Jikan
  });

  // --- CHAMADA 3: ANIMES DA TEMPORADA ATUAL ---
  // Usamos o hook pela terceira vez. Agora, passamos a opção 'season'.
  // (Vamos precisar ajustar nosso hook para aceitar 'season', já te mostro como!)
  const { data: seasonAnimesResponse, isLoading: isLoadingSeason } = useAnimes({
    limit: 10,
    options: { season: "now" }, 
  });

  return (
    <main className="container mx-auto py-8 space-y-12">
      {/* Seção 1: Top Animes */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Top 10 Animes</h2>
        {isLoadingTop ? (
          <Skeleton className="h-64 w-full rounded-lg" />
        ) : (
          // O AnimeList precisa de uma prop `isLoading` para mostrar skeletons internos,
          // ou você pode lidar com o loading aqui como já está fazendo.
          <AnimeList animes={topAnimesResponse?.data || []} />
        )}
      </section>

      {/* Seção 2: Animes de Ação Populares */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Ação</h2>
        {isLoadingAction ? (
          <Skeleton className="h-64 w-full rounded-lg bg-gray-700" />
        ) : (
          <AnimeList animes={actionAnimesResponse?.data || []} />
        )}
      </section>

      {/* Seção 3: Lançamentos da Temporada */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Em Alta na Temporada
        </h2>
        {isLoadingSeason ? (
          <Skeleton className="h-64 w-full rounded-lg" />
        ) : (
          <AnimeList animes={seasonAnimesResponse?.data || []} />
        )}
      </section>
    </main>
  );
}
