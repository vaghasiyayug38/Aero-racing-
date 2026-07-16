/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05050A',
          panel: 'rgba(15, 15, 25, 0.6)',
          neon: '#00F0FF',
          pink: '#FF003C',
          purple: '#7000FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
