import { axiosInstance } from "@/http/api";
import { JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";

type ApiParams = {
  page: number;
  limit: number;
  q?: string;
  genres?: number;
  sfw?: boolean; 
};

export type AnimesApiOptions = {
  query?: string;
  genreId?: number;
  season?: "now" | "upcoming" | "archive";
};

export const UseApi = () => {
  return {
    getAnimes: async (
      page: number = 1,
      limit: number = 20,
      options?: AnimesApiOptions
    ): Promise<JikanApiResponse> => {
      let endpoint = "/anime";

      const params: ApiParams = {
        page,
        limit,
        sfw: true,
      };

      if (options?.query) {
        params.q = options.query;
      }
      if (options?.genreId) {
        params.genres = options.genreId;
      }

      if (options?.season) {
        endpoint = `/seasons/${options.season}`;
        delete params.q;
        delete params.genres;
      } else if (!options?.query && !options?.genreId) {
        endpoint = "/top/anime";
      }

      try {
        const response: AxiosResponse<JikanApiResponse> =
          await axiosInstance.get(endpoint, { params });
        return response.data;
      } catch (error) {
        console.log("Erro ao buscar animes:", error);
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
