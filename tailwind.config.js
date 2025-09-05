/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'tap-score': {
          '0%': {
            opacity: '1',
            transform: 'translate(0, 0) scale(1)',
          },
          '20%': {
            transform: 'translateY(-10px) scale(1.1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(-100px, -150px) scale(0.5)',
          },
        },
        'penguin-tap': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.05, 0.95) translateY(5%)' },
        },
        // ✅ НОВАЯ АНИМАЦИЯ: Мерцание
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'tap-score': 'tap-score 1s ease-out forwards',
        'penguin-tap': 'penguin-tap 0.3s cubic-bezier(0.2, 1.5, 0.6, 1)',
        // ✅ НОВАЯ АНИМАЦИЯ: Мерцание
        'flicker-slow': 'flicker 2s infinite alternate ease-in-out',
      },
    },
  },
  plugins: [],
}
