/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        luckiest: ["var(--font-luckiest)"],
        sugar: ["var(--font-sugar)"],
      },
      colors: {
        "hau-purple": "#2D0A31",
        "hau-pink": "#D900FF",
        "hau-pink-light": "#E555FF",
        "hau-cyan": "#00FFFF",
      },
      backgroundImage: {
        'hau-gradient': 'linear-gradient(180deg, #1A071D 0%, #2D0D32 50%, #6D1A7A 100%)',
      },
    },
  },
  plugins: [],
};
