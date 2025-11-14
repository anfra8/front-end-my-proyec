/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#FF4D4D",
        "background-light": "#FBEFEF",
        "background-dark": "#201212",
        "frame": "#3D1E2D",
        "card": "#5A2A38"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
