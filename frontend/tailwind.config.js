// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#f9fafb',
        accent: '#e879f9',
        'primary-foreground': '#ffffff',
        'muted-foreground': '#6b7280',
        background: '#f3f4f6',
        card: '#111827',
        border: '#374151',
        destructive: '#ef4444'
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s ease forwards',
        'fade-in': 'fade-in 1s ease forwards',
        'slide-up': 'slide-up 0.5s ease forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 5px #4f46e5)' },
          '50%': { opacity: '0.7' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
