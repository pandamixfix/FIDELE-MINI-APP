// src/features/game/LevelUpAnimation.tsx

import { useState, useEffect } from 'react'

interface LevelUpAnimationProps {
  level: number
  onAnimationComplete: () => void
}

export const LevelUpAnimation = ({
  level,
  onAnimationComplete,
}: LevelUpAnimationProps) => {
  // Состояние для управления анимацией затухания
  const [isFadingOut, setIsFadingOut] = useState(false)
  const text = `УРОВЕНЬ ${level}!`

  useEffect(() => {
    // Устанавливаем таймер, который запустит анимацию затухания
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2200) // Длительность видимости текста перед затуханием

    // Устанавливаем таймер, который полностью уберет компонент
    const completeTimer = setTimeout(() => {
      onAnimationComplete()
    }, 2700) // Общая длительность жизни компонента (2200мс + 500мс анимации затухания)

    // Важно очищать таймеры при размонтировании компонента, чтобы избежать утечек памяти
    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onAnimationComplete])

  return (
    <div
      className={`
        pointer-events-none absolute left-1/2 top-1/4 z-[5000] 
        -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center 
        text-6xl font-black text-yellow-400 
        [paint-order:stroke_fill] 
        [text-shadow:0_5px_12px_rgba(0,0,0,0.5)] 
        [-webkit-text-stroke:3px_#c0392b]
        transition-all duration-500 ease-out
        ${
          isFadingOut
            ? 'opacity-0 scale-80 -translate-y-[60%]'
            : 'opacity-100 scale-100'
        } 
      `}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="animate-letter-in inline-block"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}