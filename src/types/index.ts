export interface MalLink {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

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
  title_english: string | null;
  title_japanese: string;
  type: string | null;
  source: string;
  episodes: number | null;
  status: string; 
  airing: boolean;
  duration: string;
  rating: string; 
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;

  members: number; 
  favorites: number; 

  synopsis: string | null;
  background: string | null;
  season: "summer" | "winter" | "spring" | "fall" | null;
  year: number | null;

  studios: MalLink[];
  genres: MalLink[];
  themes: MalLink[];
  demographics: MalLink[];
}

export interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface JikanApiResponse {
  data: Anime[];
  pagination: PaginationInfo;
}
