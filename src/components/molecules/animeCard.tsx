import { Anime } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  MonitorPlay,
  Film,
  Heart,
  Users,
  Tv2,
  Sparkles,
  Music4,
  Package,
  Play,
} from "lucide-react";

interface AnimeCardProps {
  anime: Anime;
  maxGenres?: number;
}

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "TV":
      return <Tv2 className="h-4 w-4" aria-label="Série de TV" />;
    case "Movie":
      return <Film className="h-4 w-4" aria-label="Filme" />;
    case "OVA":
      return <Package className="h-4 w-4" aria-label="OVA" />;
    case "Special":
      return <Sparkles className="h-4 w-4" aria-label="Especial" />;
    case "ONA":
      return (
        <MonitorPlay className="h-4 w-4" aria-label="Animação de Internet" />
      );
    case "Music":
      return <Music4 className="h-4 w-4" aria-label="Vídeo Musical" />;
    default:
      return <Play className="h-4 w-4" aria-label="Série de TV" />;
  }
};

const AnimeCard = ({ anime, maxGenres = 2 }: AnimeCardProps) => {
  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "N/A";
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const genresToShow = anime.genres.slice(0, maxGenres);

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="group relative block w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
    >
      {/* 1. IMAGEM DE FUNDO */}
      <Image
        src={anime.images.webp.large_image_url}
        alt={`Pôster de ${anime.title}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* 2. CAMADA INICIAL (SÓ TÍTULO) */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3
          className="text-lg font-bold text-white leading-tight line-clamp-2"
          title={anime.title}
        >
          {anime.title}
        </h3>
      </div>

      {/* 3. CAMADA DE HOVER (INFORMAÇÕES COMPLETAS) */}
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Seção Superior: Nota e Tipo */}
        <div className="flex justify-between items-start">
          <div
            className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm"
            aria-label={`Nota: ${anime.score?.toFixed(2) || "Não avaliado"}`}
          >
            <Award className="h-4 w-4 text-amber-400" fill="currentColor" />
            <span>{anime.score ? anime.score.toFixed(2) : "N/A"}</span>
          </div>
          {anime.type && (
            <div
              className="flex items-center gap-1.5 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm"
              aria-label={`Tipo: ${anime.type}`}
            >
              <TypeIcon type={anime.type} />
            </div>
          )}
        </div>

        {/* Seção Inferior: Título e Métricas */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white" title={anime.title}>
            {anime.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {genresToShow.map((genre) => (
              <span
                key={genre.mal_id}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-gray-200 backdrop-blur-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 text-white">
            <div
              className="flex items-center gap-1.5"
              aria-label={`${formatNumber(anime.favorites)} favoritos`}
            >
              <Heart className="h-5 w-5 text-red-500" fill="currentColor" />{" "}
              <span className="font-semibold text-base">
                {formatNumber(anime.favorites)}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5"
              aria-label={`${formatNumber(anime.members)} na comunidade`}
            >
              <Users className="h-5 w-5 text-sky-400" fill="currentColor" />
              <span className="font-semibold text-base">
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
