import { axiosInstance } from "@/http/api";
import { Anime, JikanApiResponse } from "@/types";
import { AxiosResponse } from "axios";

export const UseApi = () => {
  return {
    getTopAnimes: async (): Promise<Anime[]> => {
      try {
        const response: AxiosResponse<JikanApiResponse> =
          await axiosInstance.get("/top/anime");
        return response.data.data || [];
      } catch (error) {
        console.error("Erro ao buscar top animes:", error);
        return [];
      }
    },
  };
};
