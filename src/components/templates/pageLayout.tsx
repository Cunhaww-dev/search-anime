import React from "react";

interface PageLayoutProps {
  title: React.ReactNode;
  description: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout = ({
  title,
  description,
  headerContent,
  children,
}: PageLayoutProps) => {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row mb-8 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {title}
            </h1>
            <p className="text-gray-400 mt-2">{description}</p>
          </div>
          {headerContent && <div>{headerContent}</div>}
        </header>
        {children}
      </div>
    </main>
  );
};
