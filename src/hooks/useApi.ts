import { axiosInstance } from "@/http/api";
import { JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";

type ApiParams = {
  page: number;
  limit: number;
  q?: string;
  genres?: number;
};

export type AnimesApiOptions = {
  query?: string;
  genreId?: number;
  season?: "now" | "upcoming" | "archive"; // Opções da API para temporada
};

export const UseApi = () => {
  return {
    getAnimes: async (
      page: number = 1,
      limit: number = 20,
      options?: AnimesApiOptions
    ): Promise<JikanApiResponse> => {
      let endpoint: string;
      const params: ApiParams = {
        page,
        limit,
      };

      if (options?.query) {
        endpoint = "/anime";
        params.q = options.query;
      } else if (options?.genreId) {
        endpoint = "/anime";
        params.genres = options.genreId;
      } else if (options?.season) {
        endpoint = `/seasons/${options.season}`;
      } else {
        // Se nenhuma opção for passada, o padrão é buscar os top animes.
        endpoint = "/top/anime";
      }

      try {
        const response: AxiosResponse<JikanApiResponse> =
          await axiosInstance.get(endpoint, { params });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar animes:", error);
        return {
          data: [],
          pagination: {
            last_visible_page: 1,
            has_next_page: false,
            current_page: 1,
            items: {
              count: 0,
              total: 0,
              per_page: limit,
            },
          },
        };
      }
    },
  };
};
