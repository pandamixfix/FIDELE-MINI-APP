import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  level: number
  current: number
  max: number
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  level,
  current,
  max,
  className,
}) => {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0

  return (
    <div className={clsx('w-full', className)}>
      <div className="mb-1 flex items-center justify-between px-2 text-sm">
        <span className="font-bold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Уровень {level}
        </span>
        <span className="font-black text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {current.toLocaleString('ru-RU')} / {max.toLocaleString('ru-RU')}
        </span>
      </div>

      <div className="relative h-9 w-full">
        {/* ✅ ИСПРАВЛЕНИЕ: Рамка и полоса теперь "соседи", а не "родитель и ребёнок" */}

        {/* СЛОЙ 1 (z-10): Полоса заполнения с тёмной подложкой */}
        <div className="absolute left-[14px] right-[14px] top-[10.5px] z-10 h-[15px] overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* СЛОЙ 2 (z-20): Сама картинка рамки. Лежит ПОВЕРХ полосы. */}
        <div className="pointer-events-none absolute inset-0 z-20 w-full bg-[url('/images/progress-track.png')] bg-contain bg-center bg-no-repeat" />

        {/* СЛОЙ 3 (z-30): Пингвин-слайдер. */}
        <div
          className="pointer-events-none absolute top-1/2 z-30 h-14 w-10 -translate-y-1/2 bg-[url('/images/penguin-slider.png')] bg-contain bg-no-repeat transition-all duration-300"
          style={{
            left: `calc(14px + (100% - 28px) * ${percentage / 100})`,
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        />
      </div>
    </div>
  )
}
