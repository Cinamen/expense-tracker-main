/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  safelist: [
   
  ],
  theme: {
    extend: {
      writingMode: {
        vertical: "vertical-rl",
      },
      colors: {
        glassEffect_c: "rgb(255 255 255)",
        blue_c: "#2A306E",
        yellow_c: "#F9A11B",
        light_black:"#4A4A4A",
        gray_c:"#D9D9D9"

       
      },
      fontFamily: {
        primery_font: "Roboto",
      },
    },
  },
  plugins: [],
};
