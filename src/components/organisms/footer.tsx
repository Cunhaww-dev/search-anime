import Link from "next/link";

// Um componente simples para o Logo, para mantermos o código organizado.
const Logo = () => (
  <Link
    href="/"
    className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
  >
    Anime<span className="text-blue-500">Nexus</span>
  </Link>
);

// Ícones para as redes sociais (usando SVG para não precisar de bibliotecas externas)
const GitHubIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-4.125 0 2.062 2.062 0 014.125 0zM7.396 20.452H3.279V9h4.117v11.452z" />
  </svg>
);

const MailIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3zM1.5 4.75v.482l10.5 6.125 10.5-6.125V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zM1.5 6.953v12.297c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V6.953l-10.33 6.026a.75.75 0 01-.84 0L1.5 6.953z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Seção do Logo e Copyright */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm">
              © {new Date().getFullYear()} AnimeNexus. Todos os direitos
              reservados.
            </p>
            <p className="text-xs mt-1">
              Dados fornecidos pela{" "}
              <a
                href="https://jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Jikan API
              </a>
              .
            </p>
          </div>

          {/* Seção de Links de Contato e Redes Sociais */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <GitHubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a
              href="mailto:seu-email@example.com"
              aria-label="Email"
              className="hover:text-white transition-colors"
            >
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <p className="text-center text-xs">
          Este é um projeto de estudo para aprimorar habilidades com Next.js e
          APIs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
