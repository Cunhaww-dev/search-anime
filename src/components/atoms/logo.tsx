// /app/components/atoms/Logo.tsx
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
    >
      Anime<span className="text-blue-500">Nexus</span>
    </Link>
  );
};

export default Logo;
