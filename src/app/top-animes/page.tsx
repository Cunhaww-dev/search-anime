"use client";

import AnimeList from "@/components/organisms/animeList";
import { useTopAnimes } from "@/hooks/useTopAnimes";

export default function TopAnimesPage() {
  const { data: topAnimes, isLoading, error } = useTopAnimes();

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
        </header>

        <AnimeList animes={topAnimes || []} />
      </div>
    </main>
  );
}
