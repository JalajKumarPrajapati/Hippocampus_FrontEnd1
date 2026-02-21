/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple:{
          300:"#ff0000",
          500:"#3e38a7",
          600:"#46e449"
        }
      },
    },
  },
  plugins: [],
}



