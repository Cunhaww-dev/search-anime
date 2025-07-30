
import { Anime } from "@/types";
import Image from "next/image";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-600/20 transition-shadow duration-300 max-w-[260px]">
      <div className="relative aspect-[2/3] w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
        <Image
          src={anime.images.webp.large_image_url}
          alt={`Pôster de ${anime.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          className="transition-transform py-2 duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3
          className="text-lg font-bold text-gray-200 truncate"
          title={anime.title}
        >
          {anime.title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400">{anime.type}</span>
          <span className="flex items-center text-sm font-semibold text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {anime.score ? anime.score.toFixed(2) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
