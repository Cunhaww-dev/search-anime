"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <Navbar>{children}</Navbar>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
