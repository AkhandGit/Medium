// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan ALL TS/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
