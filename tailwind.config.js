// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Описываем все кастомные анимации из твоего проекта
      keyframes: {
        'cloud-move': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(860px, 0, 0)' },
        },
        'bonus-widget-glow': {
          '0%, 100%': {
            transform: 'scale(1) rotate(0)',
            boxShadow: '0 0 0 0 transparent',
          },
          '20%': {
            transform: 'scale(1.2) rotate(-3deg)',
            boxShadow: '0 0 20px 8px rgba(255, 223, 87, .7)',
          },
          '40%': {
            transform: 'scale(.95) rotate(3deg)',
            boxShadow: '0 0 10px 2px rgba(255, 223, 87, .4)',
          },
          '60%': {
            transform: 'scale(1.1) rotate(-2deg)',
            boxShadow: '0 0 15px 5px rgba(255, 223, 87, .5)',
          },
          '80%': {
            transform: 'scale(1) rotate(1deg)',
            boxShadow: '0 0 12px 4px rgba(255, 223, 87, .3)',
          },
        },
        'pulse-aura': {
          from: { transform: 'translate(-50%, -50%) scale(.9)', opacity: '.7' },
          to: { transform: 'translate(-50%, -50%) scale(1.1)', opacity: '.4' },
        },
        'penguin-tap': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.05, 0.95) translateY(5%)' },
        },
      },
      // Регистрируем анимации, чтобы их можно было использовать как классы (например, `animate-cloud-move-1`)
      animation: {
        'cloud-move-1': 'cloud-move 55s linear infinite',
        'cloud-move-2': 'cloud-move 70s linear infinite 5s',
        'cloud-move-3': 'cloud-move 65s linear infinite 12s',
        'bonus-glow': 'bonus-widget-glow 2.5s ease-in-out',
        'pulse-aura': 'pulse-aura 3s ease-in-out infinite alternate',
        'penguin-tap': 'penguin-tap 0.3s cubic-bezier(0.2, 1.5, 0.6, 1)',
      },
    },
  },
  plugins: [],
}
