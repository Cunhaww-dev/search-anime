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

export const useTopAnimes = () => {
  const { getTopAnimes } = UseApi();

  return useQuery({
    queryKey: ["getTopAnimes"],
    queryFn: async () => {
      const animes = await getTopAnimes();
      const uniqueAnimes = removeDuplicatedAnimes(animes);
      return uniqueAnimes;
    },
    refetchOnWindowFocus: false, 
  });
};