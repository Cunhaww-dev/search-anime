import { Anime } from "@/types";
import AnimeCard from "../molecules/anime-card";

interface AnimeListProps {
  animes: Anime[];
}

const AnimeList = ({ animes }: AnimeListProps) => {
  if (!animes || animes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-center text-lg">
          Nenhum anime para exibir.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 justify-items-center align-items-start">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;
