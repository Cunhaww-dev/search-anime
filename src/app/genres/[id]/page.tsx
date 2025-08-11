// src/app/genres/[id]/page.tsx

// 1. O import do AnimeGrid deve apontar para o arquivo correto.
//    Se você o chamou de 'AnimeGrid.tsx', o caminho é o abaixo.
import AnimeCard from "@/components/molecules/anime-card";
import AnimeList from "@/components/organisms/content-grid";
import { jikanAPI } from "@/http/api";
import { Anime } from "@/types";

// Tipagem para as props da página, incluindo os parâmetros da URL
interface GenrePageProps {
  params: {
    id: string; // O ID do gênero virá da URL
  };
}

// Função para buscar os animes de um gênero específico
async function getAnimesByGenre(id: string): Promise<Anime[]> {
  try {
    const response = await jikanAPI.get("/anime", {
      params: {
        genres: id,
        limit: 24, // Vamos limitar a 24 animes por página
        sfw: true,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error(`Falha ao buscar animes para o gênero ${id}:`, error);
    return [];
  }
}

// 2. ADICIONE ESTA FUNÇÃO DE VOLTA:
// Ela busca o nome do gênero para podermos exibir no título.
async function getGenreDetails(id: string): Promise<{ name: string } | null> {
  try {
    const response = await jikanAPI.get(`/genres/anime`);
    // Encontra o gênero específico na lista de todos os gêneros
    const genre = response.data.data.find(
      (g: any) => g.mal_id.toString() === id
    );
    return genre ? { name: genre.name } : null;
  } catch (error) {
    console.error(`Falha ao buscar detalhes do gênero ${id}:`, error);
    return null;
  }
}

// A página é um Server Component, o que é ótimo para SEO e performance
export default async function GenrePage({ params }: GenrePageProps) {
  // 3. USE Promise.all PARA BUSCAR OS DADOS EM PARALELO
  //    Isso irá declarar e preencher tanto 'animes' quanto 'genreDetails'.
  const [animes, genreDetails] = await Promise.all([
    getAnimesByGenre(params.id),
    getGenreDetails(params.id),
  ]);

  // Agora a variável 'genreDetails' existe e este código funcionará.
  const genreName = genreDetails ? genreDetails.name : `Gênero #${params.id}`;

  return (
    <main className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Gênero: <span className="text-purple-400">{genreName}</span>
          </h1>
        </header>

        {/* O uso do AnimeGrid aqui está perfeito! */}
        <AnimeList animes={animes} />
      </div>
    </main>
  );
}
