// src/app/components/molecules/GenreDropdown.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import jikanApi from "@/lib/api";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface Genre {
  mal_id: number;
  name: string;
  count: number;
}

// Lista de gêneros que queremos excluir da exibição.
const EXCLUDED_GENRES = ["Hentai", "Erotica"];

export function GenreDropdown() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const response = await jikanApi.get("/genres/anime");
        const allGenres = response.data.data || [];

        // Filtra os gêneros indesejados antes de salvar no estado.
        const filteredGenres = allGenres.filter(
          (genre: Genre) => !EXCLUDED_GENRES.includes(genre.name)
        );

        setGenres(filteredGenres);
      } catch (error) {
        console.error("Falha ao buscar gêneros:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* O gatilho (botão "Gêneros") permanece o mesmo */}
          <NavigationMenuTrigger className="bg-transparent text-gray-400 hover:text-white focus:text-white focus:bg-gray-800 data-[active]:bg-gray-800 data-[state=open]:bg-gray-800">
            Gêneros
          </NavigationMenuTrigger>

          {/* 1. ESTILIZANDO O PAINEL DO DROPDOWN */}
          {/* Adicionamos as cores de fundo e borda para combinar com o site. */}
          <NavigationMenuContent className="bg-gray-900 border-gray-700">
            {/* 2. ADICIONANDO A SCROLLBAR */}
            {/* Criamos um container com altura máxima e overflow para a rolagem. */}
            {/* Também adicionamos classes para estilizar a própria scrollbar. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 p-4 w-[300px] md:w-[600px] max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {isLoading
                ? // Esqueleto de Loading
                  Array.from({ length: 15 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full bg-gray-800" />
                  ))
                : // Renderiza os gêneros
                  genres.map((genre) => (
                    <NavigationMenuLink asChild key={genre.mal_id}>
                      <Link
                        href={`/genres/${genre.mal_id}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-purple-400 focus:bg-gray-800 focus:text-purple-400"
                      >
                        <div className="text-sm font-medium leading-none text-white">
                          {genre.name}
                        </div>
                        <p className="line-clamp-2 text-xs leading-snug text-gray-400">
                          {genre.count.toLocaleString("pt-BR")} animes
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
