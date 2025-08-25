import { Anime, JikanApiResponse } from "@/types";
import { UseApi, AnimesApiOptions } from "./useApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const removeDuplicatedAnimes = (animes: Anime[]): Anime[] => {
  const seen = new Set();
  return animes.filter((anime) => {
    const duplicated = seen.has(anime.mal_id);
    seen.add(anime.mal_id);
    return !duplicated;
  });
};

interface UseAnimesParams {
  page?: number;
  limit?: number;
  options?: AnimesApiOptions;
}

export const useAnimes = ({
  page = 1,
  limit = 20,
  options = {},
}: UseAnimesParams): UseQueryResult<JikanApiResponse, Error> => {
  const { getAnimes } = UseApi();

  return useQuery<JikanApiResponse, Error>({
    queryKey: ["getAnimes", page, limit, options],

    queryFn: async () => {
      const response = await getAnimes(page, limit, options);
      const uniqueAnimes = removeDuplicatedAnimes(response.data);
      return {
        ...response,
        data: uniqueAnimes,
      };
    },
    refetchOnWindowFocus: false,
  });
};
