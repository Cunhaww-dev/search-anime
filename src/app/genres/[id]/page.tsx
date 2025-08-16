// src/app/genres/[id]/page.tsx

import AnimeList from "@/components/organisms/animeList";
import { axiosInstance } from "@/http/api";
import { Anime } from "@/types";

interface GenrePageProps {
  params: {
    id: string;
  };
}

async function getAnimesByGenre(id: string): Promise<Anime[]> {
  try {
    const response = await axiosInstance.get("/anime", {
      params: {
        genres: id,
        limit: 24,
        sfw: true,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error(`Falha ao buscar animes para o gênero ${id}:`, error);
    return [];
  }
}

async function getGenreDetails(id: string): Promise<{ name: string } | null> {
  try {
    const response = await axiosInstance.get(`/genres/anime`);
    const genre = response.data.data.find(
      (g: any) => g.mal_id.toString() === id
    );
    return genre ? { name: genre.name } : null;
  } catch (error) {
    console.error(`Falha ao buscar detalhes do gênero ${id}:`, error);
    return null;
  }
}

export default async function GenrePage({ params }: GenrePageProps) {
  const [animes, genreDetails] = await Promise.all([
    getAnimesByGenre(params.id),
    getGenreDetails(params.id),
  ]);

  const genreName = genreDetails ? genreDetails.name : `Gênero #${params.id}`;

  return (
    <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Gênero: <span className="text-purple-400">{genreName}</span>
          </h1>
        </header>

        <AnimeList animes={animes} />
      </div>
    </main>
  );
}
