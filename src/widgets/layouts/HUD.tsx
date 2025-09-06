// src/widgets/layouts/HUD.tsx

import React from 'react'
import { ProgressBar } from '@/shared/ui/ProgressBar'
import { useGameStore } from '@/store/gameStore' // <--- 1. Импортируем наш стор

export const HUD: React.FC = () => {
  // 2. Получаем реальные данные из стора вместо MOCK_DATA
  const { level, score, maxScore, bonuses } = useGameStore()

  return (
    <div
      className="absolute left-0 right-0 top-10 z-50 flex items-center gap-2 px-2"
      aria-hidden="true"
    >
      <div className="flex-grow">
        {/* 3. Передаем реальные данные в ProgressBar */}
        <ProgressBar level={level} current={score} max={maxScore} />
      </div>

      <div className="relative flex flex-shrink-0 items-center rounded-full border border-white/20 bg-black/20 p-1 backdrop-blur-sm">
        <img
          src="/images/bonus-coin.png"
          alt="Бонусы"
          className="h-12 w-12 drop-shadow-lg"
        />
        {/* 4. Отображаем реальное количество бонусов */}
        <span className="min-w-[40px] px-2 text-right text-lg font-black text-white">
          {bonuses.toLocaleString('ru-RU')}
        </span>
      </div>
    </div>
  )
}
