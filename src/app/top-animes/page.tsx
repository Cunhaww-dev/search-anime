// src/app/top-animes/page.tsx

import AnimeList from "@/components/organisms/content-grid";
import jikanApi from "@/lib/api";
import { Anime, JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";

// Função para remover duplicados de um array de animes com base no mal_id
const removeDuplicateAnimes = (animes: Anime[]): Anime[] => {
  const seen = new Set(); // Um Set para guardar os IDs que já vimos
  return animes.filter((anime) => {
    const duplicate = seen.has(anime.mal_id);
    seen.add(anime.mal_id);
    return !duplicate; // Retorna 'true' apenas se o ID não foi visto antes
  });
};

async function getTopAnimesFull(): Promise<Anime[]> {
  try {
    const response: AxiosResponse<JikanApiResponse> = await jikanApi.get(
      "/top/anime"
    );

    const animesFromApi = response.data.data || [];

    // AQUI ESTÁ A CORREÇÃO:
    // Passamos os dados da API pela nossa função de limpeza antes de retorná-los.
    const uniqueAnimes = removeDuplicateAnimes(animesFromApi);

    return uniqueAnimes;
  } catch (error) {
    console.error("Falha ao buscar animes do topo:", error);
    return [];
  }
}

// O resto da página não precisa de nenhuma alteração
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
