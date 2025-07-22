// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Arahkan ke folder src
  ],
  darkMode: "class", // WAJIB untuk dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
