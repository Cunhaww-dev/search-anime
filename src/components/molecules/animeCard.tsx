// src/app/components/molecules/anime-card.tsx

import { Anime } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Star, Heart, Users, Dot } from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString("en-US");
  };

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="group relative block w-full aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-gray-800"
    >
      {/* 1. IMAGEM DE FUNDO */}
      {/*    - Continua com o efeito de zoom no hover. */}
      <Image
        src={anime.images.webp.large_image_url}
        alt={`Pôster de ${anime.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. BADGE DE NOTA (SCORE) */}
      {/*    - Sempre visível no canto superior. */}
      <div className="absolute top-2 left-2 z-20">
        <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
          <span>{anime.score ? anime.score.toFixed(2) : "N/A"}</span>
        </div>
      </div>

      {/* 3. CAMADA INICIAL (SEMPRE VISÍVEL, SOME NO HOVER) */}
      {/*    - Contém o gradiente e o título inicial. */}
      {/*    - 'group-hover:opacity-0': Faz esta camada desaparecer suavemente no hover. */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-base font-bold text-white" title={anime.title}>
          {anime.title}
        </h3>
      </div>

      {/* 4. CAMADA DE HOVER (COMEÇA INVISÍVEL, APARECE NO HOVER) */}
      {/*    - Contém todas as informações detalhadas. */}
      {/*    - 'opacity-0 group-hover:opacity-100': Faz esta camada aparecer no hover. */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        
        {/* Título Principal e Secundário (repetido aqui para consistência) */}
        <h3 className="text-lg font-bold text-white" title={anime.title}>
          {anime.title}
        </h3>
        <p className="text-sm text-gray-300 truncate">
          {anime.title_english || ""}
        </p>

        {/* Informações Adicionais */}
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center text-gray-300">
            <span>{anime.type}</span>
            <Dot />
            <span
              className={cn(
                anime.status === "Finished Airing"
                  ? "text-blue-400"
                  : "text-green-400"
              )}
            >
              {anime.status}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-red-400">
              <Heart className="h-4 w-4" />
              <span className="font-medium text-white">
                {formatNumber(anime.favorites)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-300">
              <Users className="h-4 w-4" />
              <span className="font-medium text-white">
                {formatNumber(anime.members)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
