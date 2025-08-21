/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aaff',
        'primary-dark': '#0088cc',
        'primary-light': '#33bbff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-black': 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)',
      },
      boxShadow: {
        'subtle-glow': '0 0 20px rgba(0, 170, 255, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
        'glass-strong': '0 12px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'subtle-float': 'subtle-float 6s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
        'slow-rotation': 'slow-rotation 20s linear infinite',
      }
    },
  },
  plugins: [],
}

