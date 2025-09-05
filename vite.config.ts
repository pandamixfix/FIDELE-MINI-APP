import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Этот модуль нужен для работы с файловыми путями

export default defineConfig({
  plugins: [react()],
  // ✅ ВОТ ЭТА СЕКЦИЯ РЕШАЕТ ПРОБЛЕМУ
  resolve: {
    alias: {
      // Здесь мы говорим Vite: "любой путь, который начинается с '@',
      // на самом деле должен начинаться с папки 'src'"
      '@': path.resolve(__dirname, './src'),
    },
  },
})
