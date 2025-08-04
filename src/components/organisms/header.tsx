"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "../atoms/logo";
import { GenreDropdown } from "../molecules/genre-dropdown";

// Definição dos links de navegação
const navLinks = [
  { href: "/season", label: "Temporada" },
  { href: "/top-animes", label: "Top Animes" },
];

// Componente para um único link, para evitar repetição de código
const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-white",
        isActive ? "text-white font-semibold" : "text-gray-400"
      )}
    >
      {label}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo e Navegação para Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Logo />
          <nav className="flex items-baseline space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <GenreDropdown />
          </nav>
        </div>

        {/* Logo para Mobile (centralizado quando o menu está visível) */}
        <div className="md:hidden">
          <Logo />
        </div>

        {/* Barra de Busca e Menu Mobile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-800">
            <Search className="h-5 w-5 text-gray-400" />
          </Button>

          {/* Menu Lateral para Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-800"
                >
                  <Menu className="h-6 w-6 text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-3/4 bg-gray-900 border-l-gray-800"
              >
                <nav className="flex flex-col gap-6 mt-10">
                  <Link
                    href="/genres"
                    className="text-lg font-medium text-gray-300 hover:text-purple-400"
                  >
                    Gêneros
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
