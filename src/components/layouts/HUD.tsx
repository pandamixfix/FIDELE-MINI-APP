import React from 'react'
import { ProgressBar } from '@/components/ui/ProgressBar'

// Описываем, какие данные будет получать наша "приборная панель"
interface HudProps {
  level: number
  score: number
  maxScore: number
  bonuses: number
}

export const HUD: React.FC<HudProps> = ({
  level,
  score,
  maxScore,
  bonuses,
}) => {
  return (
    // Главный контейнер HUD, позиционируется абсолютно вверху экрана
    <div className="absolute left-0 right-0 top-10 z-20 px-4">
      <div className="flex items-end gap-2">
        {/* Левая часть с прогресс-баром, занимает всё доступное место */}
        <div className="flex-grow">
          <ProgressBar level={level} current={score} max={maxScore} />
        </div>

        {/* Правая часть со счетчиком бонусов */}
        <div className="flex flex-shrink-0 items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-sm">
          <img
            src="/images/bonus-coin.png"
            alt="Бонусы"
            className="h-10 w-10"
          />
          <span className="px-2 text-lg font-bold text-white">
            {bonuses.toLocaleString('ru-RU')}
          </span>
        </div>
      </div>
    </div>
  )
}
