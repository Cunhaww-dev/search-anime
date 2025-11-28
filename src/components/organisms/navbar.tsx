"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Home, Star, CalendarDays, PanelLeft } from "lucide-react";
import Logo from "../atoms/logo";
import Footer from "./footer";
import { SearchGlobal } from "../atoms/searchGlobal";
import { SearchProvider } from "@/contexts/searchContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { GenreNavigation } from "./genreNavigation";

const menuItems = [
  { title: "Início", icon: <Home size={20} />, route: "/" },
  { title: "Top Animes", icon: <Star size={20} />, route: "/top-animes" },
  { title: "Temporada", icon: <CalendarDays size={20} />, route: "/season" },
];

export function Navbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const isMobile = useIsMobile();
  const pathname = usePathname();
  const showSearch = pathname !== "/" && !pathname?.startsWith("/season");

  // On resize / mobile change, default sidebar state
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
    if (!isMobile) setIsMobileDrawerOpen(false);
  }, [isMobile]);

  // Prevent body scroll when mobile drawer open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileDrawerOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileDrawerOpen((s) => !s);
    } else {
      setIsSidebarOpen((s) => !s);
    }
  };

  const closeMobileDrawer = () => setIsMobileDrawerOpen(false);

  const MenuList = ({ compact }: { compact?: boolean }) => (
    <ul className="flex-1 space-y-2 font-medium p-4 overflow-y-auto min-h-0 tailwind-scrollbar">
      {menuItems.map((item) => {
        const isActive = pathname === item.route;
        return (
          <li key={item.title}>
            <Link
              href={item.route}
              title={!compact ? "" : item.title}
              onClick={() => {
                if (isMobile) closeMobileDrawer();
              }}
              className={classNames(
                "flex items-center p-2 rounded-lg transition-colors",
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800",
                compact ? "justify-center gap-0" : "gap-4"
              )}
            >
              {item.icon}
              {!compact && (
                <span className="whitespace-nowrap transition-opacity opacity-100">
                  {item.title}
                </span>
              )}
            </Link>
          </li>
        );
      })}

      <GenreNavigation
        isSidebarOpen={!compact}
        onNavigate={() => isMobile && closeMobileDrawer()}
      />
    </ul>
  );

  return (
    <SearchProvider>
      <div className="flex min-h-screen w-full bg-gray-950 text-gray-300 overflow-x-hidden tailwind-scrollbar">
        {/* Desktop sidebar (persistent) */}
        {!isMobile && (
          <aside
            className={classNames(
              "fixed top-0 left-0 z-50 h-screen flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300",
              isSidebarOpen ? "w-60" : "w-20"
            )}
          >
            <div
              className={classNames(
                "h-16 border-b border-gray-800 flex items-center",
                isSidebarOpen ? "py-8 px-6 justify-between" : "px-4"
              )}
            >
              {/* Logo aparece apenas quando a sidebar estiver aberta */}
              <div
                className={classNames(
                  "flex items-center transition-opacity duration-200",
                  isSidebarOpen
                    ? "opacity-100 pl-0"
                    : "opacity-0 pl-0 pointer-events-none"
                )}
              >
                {isSidebarOpen && <Logo />}
              </div>

              {/* Botão de abrir/fechar à direita */}
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  aria-label={
                    isSidebarOpen ? "Fechar sidebar" : "Abrir sidebar"
                  }
                  className="p-2.5 rounded-lg hover:cursor-pointer"
                >
                  <PanelLeft size={22} />
                </button>
              </div>
            </div>

            <MenuList compact={!isSidebarOpen} />
          </aside>
        )}

        {/* Content area */}
        <div
          className={classNames(
            "flex flex-col flex-1 transition-all duration-300",
            !isMobile && (isSidebarOpen ? "ml-60" : "ml-20"),
            isMobile && "ml-0"
          )}
        >
          {/* Header/topbar */}
          <div
            className={classNames(
              "fixed left-0 w-full bg-gray-900 py-4 z-40 flex items-center gap-4",
              "pl-4 pr-4",
              !isMobile && (isSidebarOpen ? "md:pl-60" : "md:pl-20")
            )}
          >
            {/* MOBILE MENU BUTTON (dentro do header) */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Abrir menu"
              className="md:hidden inline-flex items-center p-2 rounded-md hover:bg-gray-800"
            >
              <PanelLeft size={22} />
            </button>

            <div className="ml-auto w-full max-w-xs md:max-w-md pl-4">
              {showSearch && <SearchGlobal />}
            </div>
          </div>

          {/* Mobile Drawer / Overlay */}
          {isMobile && (
            <>
              <div
                className={classNames(
                  "fixed inset-0 z-40 transition-opacity",
                  isMobileDrawerOpen
                    ? "opacity-60 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onClick={closeMobileDrawer}
                aria-hidden={!isMobileDrawerOpen}
              />

              <aside
                aria-hidden={!isMobileDrawerOpen}
                className={classNames(
                  "fixed top-0 left-0 z-50 h-full bg-gray-900 border-r border-gray-800 shadow-lg transition-transform duration-300",
                  isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full",
                  "w-72 max-w-[92%] flex flex-col"
                )}
                role="dialog"
                aria-label="Menu principal"
              >
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                  <div className="flex items-center gap-4">
                    <Logo />
                  </div>

                  <button
                    onClick={closeMobileDrawer}
                    aria-label="Fechar menu"
                    className="p-2 rounded-md hover:bg-gray-800"
                  >
                    <PanelLeft size={22} />
                  </button>
                </div>

                {/* Menu content (mobile uses non-compact) */}
                <MenuList compact={false} />
              </aside>
            </>
          )}

          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </div>
    </SearchProvider>
  );
}
