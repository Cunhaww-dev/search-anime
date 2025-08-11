// /app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Animes",
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
        <SidebarProvider>
          <Navbar>{children}</Navbar>
        </SidebarProvider>
        <Footer />
      </body>
    </html>
  );
}
