// src/app/components/molecules/anime-card.tsx

import { Anime } from "@/types";
import Image from "next/image";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    // 1. TORNAR O CARD UM CONTAINER FLEX EM COLUNA E COM ALTURA TOTAL
    //    - `flex flex-col`: Organiza os filhos (imagem, texto) verticalmente.
    //    - `h-full`: Faz o card ocupar toda a altura da célula da grade.
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-600/20 transition-shadow duration-300 w-full flex flex-col h-full">
      {/* 2. CONTAINER DA IMAGEM */}
      {/*    - `aspect-[2/3]`: Força a proporção da imagem a ser consistente. */}
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={anime.images.webp.large_image_url}
          alt={`Pôster de ${anime.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // 3. MUDAR PARA `object-cover`
          //    - `object-cover` garante que a imagem cubra toda a área,
          //      cortando o excesso se necessário. Isso evita distorções e
          //      espaços em branco, garantindo altura consistente.
          className="object-cover"
        />
      </div>

      {/* 4. CONTAINER DO TEXTO */}
      {/*    - `flex-grow`: Faz esta div ocupar todo o espaço vertical restante.
      //    - `flex flex-col justify-between`: Organiza o título e as informações
      //      para que o título fique no topo e as infos no rodapé do card. */}
      <div className="p-3 flex flex-col flex-grow justify-between">
        {/* Título */}
        <h3
          className="text-base font-bold text-gray-200 leading-tight"
          title={anime.title}
          // Adicionamos uma altura mínima para 2 linhas de texto para estabilizar o layout
          style={{ minHeight: "2.5rem" }}
        >
          {anime.title}
        </h3>

        {/* Informações (Tipo e Nota) */}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-700/50">
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
