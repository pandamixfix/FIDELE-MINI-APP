// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        'letter-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0) translateY(50px)',
          },
          '70%': {
            opacity: '1',
            transform: 'scale(1.2) translateY(0)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
         'shake-hard': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0)' },
          '20%': { transform: 'translate(-3px, -2px) rotate(-2.5deg)' },
          '40%': { transform: 'translate(2px, 3px) rotate(2.5deg)' },
          '60%': { transform: 'translate(-3px, 2px) rotate(-1.5deg)' },
          '80%': { transform: 'translate(2px, -3px) rotate(1.5deg)' },
        },
        'boom-burst': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'spin-clockwise': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'grow-shake': {
          '0%, 100%': { transform: 'scale(1) rotate(0)' },
          '20%': { transform: 'scale(1.05, 0.95) rotate(-2deg)' },
          '50%': { transform: 'scale(0.95, 1.05) rotate(2deg)' },
          '80%': { transform: 'scale(1.02, 0.98) rotate(0)' },
        },
      },
      animation: {
        'cloud-move-1': 'cloud-move 55s linear infinite',
        'cloud-move-2': 'cloud-move 70s linear infinite 5s',
        'cloud-move-3': 'cloud-move 65s linear infinite 12s',
        'bonus-glow': 'bonus-widget-glow 2.5s ease-in-out',
        'pulse-aura': 'pulse-aura 3s ease-in-out infinite alternate',
        'penguin-tap': 'penguin-tap 0.3s cubic-bezier(0.2, 1.5, 0.6, 1)',
        'letter-in':
          'letter-appear 0.6s cubic-bezier(0.2, 1.5, 0.6, 1) forwards',
        'shake-hard': 'shake-hard 0.1s linear infinite',
        'boom-burst': 'boom-burst 0.6s ease-out forwards',
        'spin-slow': 'spin-clockwise 10s linear infinite',
        'spin-slow': 'spin-clockwise 10s linear infinite',
        'grow-shake': 'grow-shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}