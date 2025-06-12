import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: ["class", '[data-theme="dark"]'], // 让 Tailwind 识别 data-theme="dark"
} satisfies Config;
