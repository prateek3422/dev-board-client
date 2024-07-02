import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    daisyui: {
      themes: ["light", "dark"],
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/Public/abstract-6047465_1920.jpg')",
      }
    },
  },
  plugins: [daisyui],
};
export default config;
