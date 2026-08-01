import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)",'"Cormorant Garamond"', 'serif'],
        serif: ["var(--font-cormorant)"],
      },
      colors: {
        olive: "#4a5d3f",
        cream: "#f5f1e6",
        blueo: "#14346D",
      },
    },
  },
  plugins: [],
};
export default config;