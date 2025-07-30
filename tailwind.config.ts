// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // ... seu conteúdo, tema, etc.
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"), // Adicione esta linha
  ],
};
export default config;
