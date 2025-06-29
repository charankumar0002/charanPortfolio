/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aaff',
        'primary-dark': '#0088cc',
      },
    },
  },
  plugins: [],
}

