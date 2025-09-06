// src/widgets/layouts/HUD.tsx

import React, { useRef, useEffect, useState } from 'react'
import { ProgressBar } from '@/shared/ui/ProgressBar'
import { useGameStore } from '@/store/gameStore'
import { useUiStore } from '@/store/uiStore'

export const HUD: React.FC = () => {
  // ✅ Теперь мы следим не только за level и maxScore, но и за score
  const { level, score, maxScore, bonuses } = useGameStore()
  const setProgressBarRef = useUiStore((state) => state.setProgressBarRef)

  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isGlowing, setIsGlowing] = useState(false)
  const glowTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Ref, чтобы предотвратить запуск эффекта при первой загрузке
  const isInitialMount = useRef(true);

  // ✅ Главное изменение: этот useEffect следит за score
  useEffect(() => {
    // Пропускаем самый первый рендер при загрузке приложения
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Сбрасываем предыдущий таймер на выключение, если он есть
    if (glowTimeoutRef.current) {
      clearTimeout(glowTimeoutRef.current)
    }

    // Включаем свечение
    setIsGlowing(true)

    // Устанавливаем таймер, который выключит свечение через 400мс
    // (чуть дольше, чем анимация движения полосы)
    glowTimeoutRef.current = setTimeout(() => {
      setIsGlowing(false)
    }, 400)
    
  }, [score]) // <--- Запускаем эффект КАЖДЫЙ РАЗ, когда меняется `score`

  // Этот useEffect нужен только для того, чтобы передать ref в стор один раз
  useEffect(() => {
    if (progressBarRef.current) {
      setProgressBarRef(progressBarRef)
    }
  }, [setProgressBarRef])

  return (
    <div
      className="absolute left-0 right-0 top-10 z-50 flex items-center gap-2 px-2"
      aria-hidden="true"
    >
      <div className="flex-grow">
        <ProgressBar
          ref={progressBarRef}
          level={level}
          current={score}
          max={maxScore}
          isGlowing={isGlowing}
        />
      </div>

      <div className="relative flex flex-shrink-0 items-center rounded-full border border-white/20 bg-black/20 p-1 backdrop-blur-sm">
        <img
          src="/images/bonus-coin.png"
          alt="Бонусы"
          className="h-12 w-12 drop-shadow-lg"
        />
        <span className="min-w-[40px] px-2 text-right text-lg font-black text-white">
          {bonuses.toLocaleString('ru-RU')}
        </span>
      </div>
    </div>
  )
}