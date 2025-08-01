// /app/page.tsx

import AnimeCard from "@/components/molecules/anime-card";
import jikanApi from "../lib/api";
import { Anime, JikanApiResponse } from "../types"; // Importamos os tipos
import { AxiosResponse } from "axios";

// A função agora tem um tipo de retorno explícito: Promise<Anime[]>
async function getTopAnimes(): Promise<Anime[]> {
  try {
    // Tipamos a resposta do Axios para sabermos que o `data` será do tipo JikanApiResponse
    const response: AxiosResponse<JikanApiResponse> = await jikanApi.get(
      "/top/anime"
    );
    return response.data.data.slice(0, 12);
  } catch (error) {
    console.error("Falha ao buscar animes do topo:", error);
    return [];
  }
}

export default async function HomePage() {
  const topAnimes = await getTopAnimes();

  return (
    <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Meu Site de <span className="text-purple-600">Animes</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Explore o universo dos animes mais populares do momento.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">
            Em Alta
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {topAnimes.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
