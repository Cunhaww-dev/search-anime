"use client";

import * as React from "react";
import { Anime } from "@/types";
import AnimeCard from "@/components/molecules/animeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimeCarouselRowProps {
  title: string;
  animes: Anime[];
  isLoading: boolean;
}

export function AnimeCarouselRow({
  title,
  animes,
  isLoading,
}: AnimeCarouselRowProps) {
  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3] rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (!animes || animes.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="group relative"
      >
        <CarouselContent className="-ml-4">
          {animes.map((anime) => (
            <CarouselItem
              key={anime.mal_id}
              className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <AnimeCard anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="cursor-pointer hover:scale-105 transition-transform" />
        <CarouselNext className="cursor-pointer hover:scale-105 transition-transform" />
      </Carousel>
    </section>
  );
}
