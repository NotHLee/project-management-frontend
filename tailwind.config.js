/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    mode: 'jit',
    extend: {
      colors:{
        primaryColor: '#FACC15',
        secondaryColor: '#FFEB3B',
        priority:{
          low: '#00C853',       // Green for Low priority
          medium: '#FFCEBF',    // Light orange for Medium priority
          high: '#F89F9F',      // Pink for High priority
          urgent: '#FD0000',
        },
      },
      screens:{
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '2.5xl': '1666px',
      },
      width: {
        '20vw': '20vw',
        '50vw': '50vw',
        '75vw': '75vw',
      },
      height: {
        '20vh': '20vh',
        '50vh': '50vh',
        '75vh': '75vh',
      },
  },
  plugins: [],
}}