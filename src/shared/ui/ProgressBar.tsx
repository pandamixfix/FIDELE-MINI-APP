// src/shared/ui/ProgressBar.tsx

import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { useSmoothCounter } from '@/hooks/useSmoothCounter'

interface ProgressBarProps {
  level: number
  current: number
  max: number
  className?: string
  isGlowing?: boolean
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ level, current, max, className, isGlowing }, ref) => {
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
        
        <div className="relative h-5" ref={ref}>
          <div className="h-full rounded-full border-2 border-stone-500 bg-gradient-to-b from-stone-700 to-stone-800 shadow-inner" />
          
          <div className="absolute inset-0 m-1">
            <div
              className={clsx(
                'relative h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400',
                isGlowing &&
                  'shadow-[0_0_10px_2px_#facc15,_0_0_20px_5px_rgba(250,204,21,0.5)]'
              )}
              style={{
                width: `${percentage}%`,
                transition: 'width 0.2s linear, box-shadow 0.2s ease-in-out',
              }}
            >
              <div
                className="pointer-events-none absolute right-0 top-1/2 h-10 w-8 -translate-y-1/2 translate-x-1/2 bg-[url('/images/penguin-slider.png')] bg-contain bg-center bg-no-repeat"
                style={{
                  transition: 'opacity 0.2s linear',
                  opacity: percentage > 0 ? 1 : 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)