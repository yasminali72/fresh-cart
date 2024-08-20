/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main': '#D14D72',
        'sec':'#FCC8D1',
        'thrid':'#FEF2F4',
        'four':'#FFABAB',
        'Dark':'#1a202c',
      },
      boxShadow: {
        '3xl':'0 0 8px 3px'
      }
     
    },
  },
  plugins: [],
  darkMode: 'class',
  
}

