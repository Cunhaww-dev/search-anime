import type { Config } from "tailwindcss";

const config: Config = {
   content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
