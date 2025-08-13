// src/app/top-animes/page.tsx

import { SearchGlobal } from "@/components/atoms/search.";
import AnimeList from "@/components/organisms/animeList";
import { jikanAPI } from "@/http/api";
import { Anime, JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";
import { Search } from "lucide-react";

const removeDuplicateAnimes = (animes: Anime[]): Anime[] => {
  const seen = new Set();
  return animes.filter((anime) => {
    const duplicate = seen.has(anime.mal_id);
    seen.add(anime.mal_id);
    return !duplicate;
  });
};

async function getTopAnimesFull(): Promise<Anime[]> {
  try {
    const response: AxiosResponse<JikanApiResponse> = await jikanAPI.get(
      "/top/anime"
    );

    const animesFromApi = response.data.data || [];

    const uniqueAnimes = removeDuplicateAnimes(animesFromApi);

    return uniqueAnimes;
  } catch (error) {
    console.error("Falha ao buscar animes do topo:", error);
    return [];
  }
}

export default async function TopAnimesPage() {
  const topAnimes = await getTopAnimesFull();

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

        <AnimeList animes={topAnimes} />
      </div>
    </main>
  );
}
