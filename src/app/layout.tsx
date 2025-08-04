// /app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeNexus",
  description: "Seu portal para explorar o mundo dos animes.",
};

// Tipamos as props do layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
