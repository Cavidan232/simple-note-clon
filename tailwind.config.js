/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-dark":"#1f2123",
        "custom-blue":"#3361cc",
        "custom-light":"#d5dff5"
      },
      fontFamily: {
        'sf-pro': ['"SF Pro Display"', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        maxWidth:'1000px',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': {
          fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
          'color-scheme': 'dark light',
        },
      });
    },
  ],
}
