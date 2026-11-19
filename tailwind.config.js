/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#832244',
          dark: '#621430',
          light: '#9B2B52',
          subtle: '#FDF2F4'
        },
        gold: {
          DEFAULT: '#E5A83B',
          warm: '#D49A38'
        },
        blush: {
          DEFAULT: '#FDF2F4',
          border: '#FCE8EC',
          subtle: '#FFF7F8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
