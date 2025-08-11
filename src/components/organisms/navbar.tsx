// src/app/components/organisms/AppLayout.tsx
"use client";

// --- Importações (sem alterações) ---
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import classNames from "classnames";
import {
  Home,
  Star,
  CalendarDays,
  Clapperboard,
  PanelLeft,
  Menu,
  Search,
} from "lucide-react";
import Logo from "../atoms/logo";

// --- Dados do Menu (sem alterações) ---
const menuItems = [
  { title: "Início", icon: <Home size={20} />, route: "/" },
  { title: "Top Animes", icon: <Star size={20} />, route: "/top-animes" },
  { title: "Temporada", icon: <CalendarDays size={20} />, route: "/season" },
  { title: "Gêneros", icon: <Clapperboard size={20} />, route: "/genres" },
];

// --- Componente Principal ---
export function Navbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // 1. O CONTAINER PRINCIPAL - A MUDANÇA MAIS IMPORTANTE
    // Usamos 'flex' em vez de 'grid'. É mais simples para este tipo de layout
    // e evita problemas de sobreposição.
    <div className="flex h-screen min-h-screen w-full bg-gray-950 text-gray-300">
      {/* ========================================================================= */}
      {/* 2. SIDEBAR LATERAL (Aside)                                              */}
      {/* ========================================================================= */}
      {/* A sidebar agora é um elemento flexível que não desaparece. */}
      <aside
        className={classNames(
          "fixed top-0 left-0 z-50 h-screen flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300",
          // A largura da sidebar muda, mas ela nunca some.
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        {/* Cabeçalho da Sidebar */}
        <div
          className={classNames(
            "flex py-8 items-center justify-between h-16 border-b border-gray-800",
            isSidebarOpen ? "px-6" : "px-4"
          )}
        >
          <div
            className={classNames(
              "transition-opacity",
              isSidebarOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <Logo />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <PanelLeft size={22} />
          </button>
        </div>

        {/* Itens do Menu */}
        <ul className="space-y-2 font-medium p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <li key={item.title}>
                <Link
                  href={item.route}
                  title={isSidebarOpen ? "" : item.title} // Dica de ferramenta quando colapsado
                  className={classNames(
                    "flex items-center p-2 rounded-lg transition-colors",
                    isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800",
                    isSidebarOpen ? "gap-4" : "justify-center"
                  )}
                >
                  {item.icon}
                  <span
                    className={classNames(
                      "whitespace-nowrap transition-opacity",
                      isSidebarOpen ? "opacity-100" : "hidden"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ========================================================================= */}
      {/* 3. CONTAINER DO CONTEÚDO (Navbar + Main)                                */}
      {/* ========================================================================= */}
      {/* Este container agora tem uma margem à esquerda que se ajusta dinamicamente */}
      <div
        className={classNames(
          "flex flex-col flex-1 transition-all duration-300",
          // A margem à esquerda agora corresponde exatamente à largura da sidebar.
          isSidebarOpen ? "ml-72" : "ml-20"
        )}
      >
        {/* NAVBAR SUPERIOR */}
        {/* A navbar não precisa mais de padding, pois o container pai já a posiciona. */}
        <nav className="fixed py-8 top-0 z-40 w-full bg-gray-900 border-b border-gray-800 h-16">
          {/* O conteúdo da navbar (busca, perfil) vai aqui.
               Precisa de um ajuste para não ficar por baixo da sidebar. */}
          <div
            className={classNames(
              "flex items-center justify-end h-full px-6 transition-all duration-300",
              isSidebarOpen ? "w-[calc(100%-18rem)]" : "w-[calc(100%-5rem)]"
            )}
          >
            <div className="relative w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar animes..."
                className="w-full bg-gray-800 border border-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="w-10 h-10 ml-4 rounded-full bg-gray-700"></div>
          </div>
        </nav>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="pt-16">
          {/* pt-16 para dar espaço para a navbar fixa */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
