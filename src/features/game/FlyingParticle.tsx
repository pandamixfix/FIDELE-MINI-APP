// src/features/game/FlyingParticle.tsx

import { useEffect, useState } from 'react'

export interface FlyingParticleData {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  onComplete: (id: number) => void
}

export const FlyingParticle = ({
  id,
  startX,
  startY,
  endX,
  endY,
  onComplete,
}: FlyingParticleData) => {
  const [position, setPosition] = useState({ x: startX, y: startY })
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Используем requestAnimationFrame для плавного старта анимации
    requestAnimationFrame(() => {
      setPosition({ x: endX, y: endY })
      setOpacity(0)
    })

    const timer = setTimeout(() => {
      onComplete(id)
    }, 800) // Длительность анимации полета

    return () => clearTimeout(timer)
  }, [id, endX, endY, onComplete])

  return (
    <div
      className="pointer-events-none fixed h-4 w-4 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[0_0_10px_5px_rgba(255,255,100,0.7),_0_0_20px_10px_rgba(255,255,100,0.4)]"
      style={{
        left: 0, // Позиционируемся от левого верхнего угла viewport
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: opacity,
        transition:
          'transform 0.8s cubic-bezier(0.5, 0, 1, 0.5), opacity 0.3s linear 0.5s',
      }}
    />
  )
}