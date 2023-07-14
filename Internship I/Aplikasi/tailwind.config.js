/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21A2FF',
        'primary-dark': '#35589A',
        'primary-light': '#DBE5FF',
        'secondary': '#0FD526',
        'secondary-light': '#09A21B',
        'background': '#DBE5FF',
      },
    },
  },
  plugins: [],
}