/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightviolet: "#F5F3FF", //bg-50
        semiviolet: "#EDE9FE", //bg-100
        primary: "#A100FF",
        secondary: "#7001b0",
        cuviolet: "#4b0275", //bg-900
      },
      fontFamily: {
        heading: ["Noto Sans", "sans-serif"],
        body: ["Noto Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
