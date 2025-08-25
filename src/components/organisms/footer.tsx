import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Heart,
  ExternalLink,
  Home,
  Star,
  Calendar,
  Clapperboard,
  Info,
  Shield,
  Users,
  Zap,
} from "lucide-react";

// Logo estilizada
const Logo = () => (
  <Link
    href="/"
    className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
  >
    AllAnimes
  </Link>
);

// Componente de link social
const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group p-3 rounded-xl bg-gray-800/50 hover:bg-purple-600 text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
  >
    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

// Componente de link de navegação
const NavLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="group flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300"
  >
    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
    <span className="group-hover:translate-x-1 transition-transform duration-300">
      {children}
    </span>
  </Link>
);

// Componente de link externo
const ExternalLinkComponent = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-300"
  >
    <span className="group-hover:underline">{children}</span>
    <ExternalLink className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Gradiente de brilho no topo */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600" />

      {/* Efeito de brilho sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6 py-16">
        {/* Seção principal do footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Coluna 1: Logo e descrição */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Logo />
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Sua plataforma definitiva para descobrir, explorar e acompanhar
                os melhores animes. Mergulhe no universo dos animes com nossa
                curadoria especial.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">10K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Animes
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">50K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Usuários
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Gratuito
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Navegação
            </h3>
            <nav className="space-y-4">
              <NavLink href="/" icon={Home}>
                Início
              </NavLink>
              <NavLink href="/top-animes" icon={Star}>
                Top Animes
              </NavLink>
              <NavLink href="/season" icon={Calendar}>
                Temporada Atual
              </NavLink>
              <NavLink href="/genres" icon={Clapperboard}>
                Gêneros
              </NavLink>
            </nav>
          </div>

          {/* Coluna 3: Recursos e Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Recursos
            </h3>
            <nav className="space-y-4">
              <NavLink href="/about" icon={Info}>
                Sobre Nós
              </NavLink>
              <NavLink href="/privacy" icon={Shield}>
                Privacidade
              </NavLink>
              <div className="pt-2">
                <ExternalLinkComponent href="https://jikan.moe">
                  Jikan API
                </ExternalLinkComponent>
              </div>
              <div>
                <ExternalLinkComponent href="https://myanimelist.net">
                  MyAnimeList
                </ExternalLinkComponent>
              </div>
            </nav>
          </div>
        </div>

        {/* Linha separadora com gradiente */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gray-900 px-4 py-1 border rounded-4xl">
              <Heart className="h-6 w-6 text-purple-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Seção inferior */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Copyright e créditos */}
          <div className="text-center lg:text-left space-y-2">
            <p className="text-gray-400 flex items-center justify-center lg:justify-start gap-2">
              <Code2 className="h-4 w-4 text-purple-400" />
              <span>
                Desenvolvido com{" "}
                <span className="text-purple-400 font-medium">Next.js</span>,{" "}
                <span className="text-purple-400 font-medium">TypeScript</span>{" "}
                e{" "}
                <span className="text-purple-400 font-medium">
                  Tailwind CSS
                </span>
              </span>
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} AllAnimes. Todos os direitos reservados. Dados
              fornecidos pela Jikan API.
            </p>
          </div>

          {/* Links sociais */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              Conecte-se:
            </span>
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://github.com/Cunhaww-dev"
                icon={Github}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/lucas-da-cunha-fabri-b34ab4312/"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:seu-email@example.com"
                icon={Mail}
                label="Email"
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <p className="text-center text-xs text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Este é um projeto educacional sem fins lucrativos. Todas as
            informações sobre animes são fornecidas pela Jikan API e
            MyAnimeList. As imagens e dados pertencem aos seus respectivos
            proprietários. Este site não hospeda nem distribui conteúdo de
            anime.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
