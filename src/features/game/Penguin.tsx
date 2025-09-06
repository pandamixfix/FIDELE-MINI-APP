// src/features/game/Penguin.tsx

import { useState, useRef, useEffect } from 'react'
import { useGameStore, useGameActions, selectPenguinScale } from '@/store/gameStore'
import { useUiStore, useUiActions } from '@/store/uiStore' // ✅ Импортируем useUiActions
import { FlyingParticle, FlyingParticleData } from './FlyingParticle'
import clsx from 'clsx'

export const Penguin: React.FC = () => {
  // ✅ Получаем actions через специальные стабильные хуки
  const { applyTapScore } = useGameActions()
  const { setPenguinRef } = useUiActions()

  // ✅ Получаем state через обычные хуки
  const penguinSkin = useGameStore((state) => state.penguinSkin)
  const isEvolving = useGameStore((state) => state.isEvolving)
  const penguinScale = useGameStore(selectPenguinScale)
  const progressBarRef = useUiStore((state) => state.progressBarRef)
  
  const penguinRef = useRef<HTMLButtonElement>(null)
  
  const [tapAnimationClass, setTapAnimationClass] = useState('')
  const [growAnimationKey, setGrowAnimationKey] = useState(0)
  const [particles, setParticles] = useState<FlyingParticleData[]>([])
  const prevScale = useRef(penguinScale)

  useEffect(() => {
    if (prevScale.current !== penguinScale && !isEvolving) {
      setGrowAnimationKey(key => key + 1)
    }
    prevScale.current = penguinScale
  }, [penguinScale, isEvolving])

  // ✅ Этот useEffect теперь БЕЗОПАСЕН, так как setPenguinRef стабилен
  useEffect(() => {
    if (penguinRef.current) setPenguinRef(penguinRef)
  }, [setPenguinRef])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEvolving) return
    applyTapScore()
    setTapAnimationClass('animate-penguin-tap')
    setTimeout(() => setTapAnimationClass(''), 300)

    if (progressBarRef?.current) {
      const barRect = progressBarRef.current.getBoundingClientRect()
      const newParticle: FlyingParticleData = {
        id: Date.now() + Math.random(),
        startX: e.clientX,
        startY: e.clientY,
        endX: barRect.left + barRect.width / 2,
        endY: barRect.top + barRect.height / 2,
        onComplete: (id) => {
          setParticles((current) => current.filter((p) => p.id !== id))
        },
      }
      setParticles((current) => [...current, newParticle])
    }
  }

  return (
    <>
      <div
        className={`transition-all duration-500 ${isEvolving ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `scale(${penguinScale})` }}
      >
        <div className="relative h-48 w-48">
          <button
            ref={penguinRef}
            onClick={handleClick}
            className="h-full w-full rounded-full focus:outline-none"
            aria-label="Tap penguin"
          >
            <div key={growAnimationKey} className={clsx(tapAnimationClass, growAnimationKey > 0 && 'animate-grow-shake')}>
              <img
                src={penguinSkin}
                alt="Fidele Penguin"
                className="h-full w-full object-contain drop-shadow-lg"
                draggable="false"
              />
            </div>
          </button>
        </div>
      </div>
      
      {particles.map((p) => (
        <FlyingParticle key={p.id} {...p} />
      ))}
    </>
  )
}