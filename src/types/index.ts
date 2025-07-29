// Este tipo representa a estrutura de um único anime, conforme retornado pela Jikan API.
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
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  studios: {
    mal_id: number;
    type: string;
    name: string;
  }[];
  genres: {
    mal_id: number;
    type: string;
    name: string;
  }[];
}

// A resposta da API para buscas (como /top/anime) vem dentro de um objeto com uma chave "data".
export interface JikanApiResponse {
  data: Anime[];
}
