import React from 'react'

export interface TapScoreData {
  id: number
  x: number
  y: number
}

/**
 * Компонент для одного всплывающего "светлячка"
 */
export const TapScore: React.FC<TapScoreData> = ({ x, y }) => {
  return (
    <div
      // ✅ ИЗМЕНЕНИЯ: Новые цвета, свечение, размеры, и добавление анимации мерцания
      className="animation-flicker-slow pointer-events-none absolute h-4 w-4 animate-tap-score rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[0_0_10px_5px_rgba(255,255,100,0.7),_0_0_20px_10px_rgba(255,255,100,0.4)]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  )
}
