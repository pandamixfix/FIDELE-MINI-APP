// src/shared/ui/ProgressBar.tsx
import React from 'react'
import clsx from 'clsx'
import { useSmoothCounter } from '@/hooks/useSmoothCounter'

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
  const smoothCurrent = useSmoothCounter(current)
  const percentage = max > 0 ? Math.min((smoothCurrent / max) * 100, 100) : 0

  return (
    <div className={clsx('w-full', className)}>
      <div className="mb-1 flex items-center justify-between px-2 text-sm">
        <span className="font-bold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Уровень {level}
        </span>
        <span className="font-black text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {smoothCurrent.toLocaleString('ru-RU')} /{' '}
          {max.toLocaleString('ru-RU')}
        </span>
      </div>
      <div className="relative h-5">
        <div className="h-full rounded-full border-2 border-stone-500 bg-gradient-to-b from-stone-700 to-stone-800 shadow-inner" />
        <div
          className="absolute inset-0 m-1 h-auto rounded-full bg-gradient-to-r from-green-400 to-cyan-400"
          style={{ width: `${percentage}%`, transition: 'width 0.2s linear' }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-10 w-8 -translate-y-1/2 bg-[url('/images/penguin-slider.png')] bg-contain bg-center bg-no-repeat"
          style={{
            left: `calc(4px + (100% - 8px) * ${percentage / 100})`,
            transform: 'translateX(-50%) translateY(-50%)',
            transition: 'left 0.2s linear',
          }}
        />
      </div>
    </div>
  )
}
