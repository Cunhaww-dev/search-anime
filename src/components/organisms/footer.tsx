// src/app/components/organisms/footer.tsx

import Link from "next/link";
// 1. Importando os ícones diretamente da biblioteca 'lucide-react'
import { Github, Linkedin, Mail, Code } from "lucide-react";

// 2. Componente de Logo atualizado para usar a cor roxa do nosso tema.
const Logo = () => (
  <Link href="/" className="text-2xl font-bold text-white transition-colors">
    Anime<span className="text-purple-500">Nexus</span>
  </Link>
);

// 3. Componente para os links de redes sociais, para evitar repetição.
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
    className="text-gray-400 hover:text-purple-400 transition-colors"
  >
    <Icon className="h-6 w-6" />
  </a>
);

const Footer = () => {
  return (
    // 4. O container principal do footer com a cor de fundo e borda superior.
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Seção Principal: Logo, Copyright e Links Sociais */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo e informações */}
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-2 text-sm text-gray-400">
              © {new Date().getFullYear()} AnimeNexus. Todos os direitos
              reservados.
            </p>
          </div>

          {/* Links de Redes Sociais */}
          <div className="flex items-center space-x-4">
            <SocialLink
              href="https://github.com/seu-usuario"
              icon={Github}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/in/seu-usuario"
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

        {/* Linha Separadora */}
        <hr className="my-6 border-gray-800" />

        {/* Seção Secundária: Mensagem de estudo e créditos */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row">
          <p className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>
              Projeto de estudo para aprimorar habilidades com Next.js e APIs.
            </span>
          </p>
          <p>
            Dados fornecidos pela{" "}
            <a
              href="https://jikan.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              Jikan API
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
