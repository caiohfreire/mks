import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#0F52BA'
      },
      textColor: {
        default: '#2C2C2C'
      },
      boxShadow: {
        card: '0px 2px 8px 0px #00000022'
      },
      screens: {
        sm: '320px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
export default config;
