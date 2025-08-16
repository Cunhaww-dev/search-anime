import { Anime } from "@/types";
import { UseApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";

const removeDuplicatedAnimes = (animes: Anime[]): Anime[] => {
  const seen = new Set();
  return animes.filter((anime) => {
    const duplicated = seen.has(anime.mal_id);
    seen.add(anime.mal_id);
    return !duplicated;
  });
};

export const useTopAnimes = (page: number = 1, limit: number = 20) => {
  const { getTopAnimes } = UseApi();

  return useQuery({
    queryKey: ["getTopAnimes", page, limit],
    queryFn: async () => {
      const response = await getTopAnimes(page, limit);
      const uniqueAnimes = removeDuplicatedAnimes(response.data);
      return {
        ... response, 
        data: uniqueAnimes
      };
    },
    refetchOnWindowFocus: false,
    // keepPreviousData: true 
  });
};