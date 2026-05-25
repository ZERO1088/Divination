/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"宋体"', 'SimSun', 'serif'],
      },
      colors: {
        brand: {
          dark: '#0a0c0f',
          surface: '#16171d',
          card: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.1)',
        },
      },
    },
  },
  plugins: [],
};
