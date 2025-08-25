"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Genre {
  mal_id: number;
  name: string;
}

interface GenreModalProps {
  allGenres: Genre[];
  children: ReactNode;
}

export function GenreModal({ allGenres, children }: GenreModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredGenres = allGenres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] bg-gray-900 border-gray-800 text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-white">
            Explore Todos os Gêneros
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="text"
            placeholder="Buscar gênero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto pr-2 tailwind-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredGenres.map((genre) => (
              <Link
                key={genre.mal_id}
                href={`/genres/${genre.mal_id}`}
                className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
