"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { axiosInstance } from "@/http/api";
import { GenreModal } from "./genreModal";
import { Button } from "../ui/button";

interface Genre {
  mal_id: number;
  name: string;
  count: number;
}

interface GenreNavigationProps {
  isSidebarOpen: boolean;
}

export function GenreNavigation({ isSidebarOpen }: GenreNavigationProps) {
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [popularGenres, setPopularGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isGenrePage = pathname.startsWith("/genres/");

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axiosInstance.get("/genres/anime");
        const genresData = response.data.data;

        setAllGenres(genresData);
        setPopularGenres(genresData.slice(0, 12));
      } catch (error) {
        console.log("Erro ao buscar gêneros:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  if (!isSidebarOpen) {
    return (
      <li>
        <GenreModal allGenres={allGenres}>
          <button
            title="Gêneros"
            className={cn(
              "flex items-center justify-center p-2 rounded-lg transition-colors w-full",
              isGenrePage ? "bg-purple-600 text-white" : "hover:bg-gray-800"
            )}
          >
            <Clapperboard size={20} />
          </button>
        </GenreModal>
      </li>
    );
  }

  return (
    <li>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={isGenrePage ? "genres" : ""}
      >
        <AccordionItem value="genres" className="border-none">
          <AccordionTrigger
            className={cn(
              "flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors hover:no-underline",
              isGenrePage
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white"
            )}
          >
            <div className="flex items-center gap-4">
              <Clapperboard size={20} />
              <span className="whitespace-nowrap text-base">Gêneros</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            {loading ? (
              <div className="text-center py-4 text-gray-400 ml-8">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400 mx-auto mb-2"></div>
                <p className="text-sm">Carregando...</p>
              </div>
            ) : (
              <div className="pt-2 mx-2">
                {popularGenres.map((genre) => {
                  const isCurrentGenre = pathname === `/genres/${genre.mal_id}`;
                  return (
                    <Link
                      key={genre.mal_id}
                      href={`/genres/${genre.mal_id}`}
                      className={cn(
                        "flex flex-col px-3 py-2 my-2 text-sm rounded transition-all duration-200",
                        isCurrentGenre
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      )}
                    >
                      • {genre.name}
                    </Link>
                  );
                })}
                <div className="pt-2">
                  <GenreModal allGenres={allGenres}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-purple-400 hover:text-purple-300 px-3 py-2 text-sm h-auto font-semibold cursor-pointer"
                    >
                      Ver todos os gêneros...
                    </Button>
                  </GenreModal>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
