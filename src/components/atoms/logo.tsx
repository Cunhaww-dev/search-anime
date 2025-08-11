// /app/components/atoms/Logo.tsx
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
    >
      <Image src="/logo.svg" alt="Logo" width={70} height={70} priority />
    </Link>
  );
};

export default Logo;
