"use client";

import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      <Wrench className="h-16 w-16 text-purple-500 animate-bounce" />

      <h1 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Em Manutenção
      </h1>

      <p className="mt-4 text-gray-400 max-w-lg">
        Esta página ainda não está disponível. Nossa equipe de ninjas está
        trabalhando para colocá-la no ar em breve ⚡.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar para a Home
      </Link>
    </main>
  );
}
