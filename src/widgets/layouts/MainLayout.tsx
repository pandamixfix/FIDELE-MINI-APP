// src/widgets/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { HUD } from './HUD' // <--- ДОБАВЛЯЕМ ИМПОРТ

export function MainLayout() {
  return (
    <div className="relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-[var(--tg-theme-bg-color)] shadow-2xl">
      {/* Вставляем HUD сюда */}
      <HUD />

      <main className="flex-grow overflow-y-auto p-4 pt-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
