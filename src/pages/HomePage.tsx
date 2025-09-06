// src/pages/HomePage.tsx

import { Penguin } from '@/features/game/Penguin'
import { useTelegram } from '@/hooks/useTelegram'

export function HomePage() {
  const { user } = useTelegram()

  return (
    <div className="flex h-full flex-col items-center">
      <p className="pt-2 text-gray-500 dark:text-gray-400">
        Привет, {user?.first_name || 'незнакомец'}!
      </p>
      <div className="flex-grow flex flex-col justify-end mb-8">
        {/* ✅ Просто рендерим пингвина, без лишних пропсов */}
        <Penguin />
      </div>
    </div>
  )
}