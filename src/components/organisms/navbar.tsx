// src/app/components/organisms/AppLayout.tsx
"use client";

// --- Importações (sem alterações) ---
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Footer from "./footer";
import { SearchGlobal } from "../atoms/search.";

// --- Dados do Menu (sem alterações) ---
const menuItems = [
  { title: "Início", icon: <Home size={20} />, route: "/" },
  { title: "Top Animes", icon: <Star size={20} />, route: "/top-animes" },
  { title: "Temporada", icon: <CalendarDays size={20} />, route: "/season" },
  { title: "Gêneros", icon: <Clapperboard size={20} />, route: "/genres/id" },
];

// --- Componente Principal ---
export function Navbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen w-full bg-gray-950 text-gray-300">
      <aside
        className={classNames(
          "fixed top-0 left-0 z-50 h-screen flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300",
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
            className="pr-2.5 py-2 rounded-lg hover:cursor-pointer"
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
                  title={isSidebarOpen ? "" : item.title}
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

      <div
        className={classNames(
          "flex flex-col flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-72" : "ml-20"
        )}
      >
        <div className="flex bg-gray-900 pt-2 pr-4 justify-end">
          <SearchGlobal />
        </div>

        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
