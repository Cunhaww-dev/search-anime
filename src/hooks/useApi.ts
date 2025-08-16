import { axiosInstance } from "@/http/api";
import { JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";

export const UseApi = () => {
  return {
    getTopAnimes: async (page: number = 1, limit: number = 20): Promise<JikanApiResponse> => {
      try {
        const response: AxiosResponse<JikanApiResponse> =
          await axiosInstance.get("/top/anime", {
            params: {
              page,
              limit
            }
          });
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar top animes:", error);
        return {
          data: [],
          pagination: {
            last_visible_page: 1,
            has_next_page: false,
            current_page: 1,
            items: {
              count: 0,
              total: 0,
              per_page: limit
            }
          }
        };
      }
    },
  };
};

