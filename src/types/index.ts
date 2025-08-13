// src/types/index.ts

// Este tipo representa a estrutura de um único anime, conforme retornado pela Jikan API v4.
// Foi ajustado para incluir todos os campos que usamos e corrigir tipos incorretos.
export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string | null; // Títulos em inglês podem ser nulos
  title_japanese: string;
  type: string | null;
  source: string;
  episodes: number | null;
  status: string; // Ex: "Finished Airing", "Currently Airing"
  airing: boolean;
  duration: string;
  rating: string; // Ex: "PG-13 - Teens 13 or older"
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;

  // --- CAMPOS ADICIONADOS/CORRIGIDOS PARA O NOVO CARD ---
  members: number; // Número de membros no MyAnimeList
  favorites: number; // CORREÇÃO: 'favorites' é um número, não uma função.

  synopsis: string | null;
  background: string | null;
  season: "summer" | "winter" | "spring" | "fall" | null; // Tipagem mais específica para a estação
  year: number | null;

  // Relacionamentos (Arrays de objetos)
  studios: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  themes: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  demographics: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

// A resposta da API para buscas (como /top/anime) vem dentro de um objeto com uma chave "data".
// Esta interface permanece a mesma e está correta.
export interface JikanApiResponse {
  data: Anime[];
  pagination?: {
    // Adicionar a paginação pode ser útil no futuro
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
