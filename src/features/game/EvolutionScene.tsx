// src/features/game/EvolutionScene.tsx

import { useState, useEffect, useMemo } from 'react'
import { PENGUIN_EVOLUTION_STAGES } from '@/config/game'
import { useGameStore } from '@/store/gameStore'
import { useUiStore } from '@/store/uiStore'

interface EvolutionSceneProps {
  onComplete: () => void
}

const getSkinForLevel = (level: number) => {
  return (
    [...PENGUIN_EVOLUTION_STAGES]
      .reverse()
      .find((s) => level >= s.level)?.src ?? PENGUIN_EVOLUTION_STAGES[0].src
  )
}

export const EvolutionScene = ({ onComplete }: EvolutionSceneProps) => {
  const level = useGameStore((state) => state.level)
  const penguinRef = useUiStore((state) => state.penguinRef)
  
  const oldSkin = getSkinForLevel(level - 1)
  const newSkin = getSkinForLevel(level)

  const [stage, setStage] = useState('entering')

  const coords = useMemo(() => {
    if (!penguinRef?.current) {
      return { startX: '50%', startY: '150%', endX: '50%', endY: '50%' }
    }
    const rect = penguinRef.current.getBoundingClientRect()
    return {
      startX: `${rect.left + rect.width / 2}px`,
      startY: `${rect.top + rect.height / 2}px`,
      endX: '50%',
      endY: '45%',
    }
  }, [penguinRef])

  // ✅ НОВЫЕ ТАЙМИНГИ ДЛЯ ПЛАВНОСТИ
  useEffect(() => {
    const liftTimer = setTimeout(() => setStage('lifted'), 50)
    const shakeTimer = setTimeout(() => setStage('shaking'), 850)
    const flashTimer = setTimeout(() => setStage('flashing'), 1850)
    const revealTimer = setTimeout(() => setStage('reveal'), 2050) // Появление пингвина чуть раньше, ПОД взрывом
    const exitTimer = setTimeout(() => setStage('exiting'), 3000) // Начинаем спуск
    const completeTimer = setTimeout(onComplete, 3800) // Завершение после спуска (3000 + 800)

    return () => {
      clearTimeout(liftTimer)
      clearTimeout(shakeTimer)
      clearTimeout(flashTimer)
      clearTimeout(revealTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const currentSkin = stage === 'reveal' || stage === 'exiting' ? newSkin : oldSkin
  const isLifted = stage === 'lifted' || stage === 'shaking' || stage === 'flashing' || stage === 'reveal'
  const isPenguinVisible = stage !== 'flashing';

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-500 ${
          isLifted || stage === 'exiting' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* ✅ Пингвин и лучи теперь всегда вместе */}
      <div
        className="absolute w-48 h-48"
        style={{
          // ✅ Пингвин теперь возвращается на стартовую позицию
          left: stage === 'exiting' ? coords.startX : isLifted ? coords.endX : coords.startX,
          top: stage === 'exiting' ? coords.startY : isLifted ? coords.endY : coords.startY,
          // ✅ Возвращается к начальному размеру
          transform: `translate(-50%, -50%) scale(${isLifted ? 1.2 : 0.8})`,
          transition: 'all 0.8s cubic-bezier(.6, .05, .38, 1)',
        }}
      >
        <div
          className={`absolute inset-[-200%] rounded-full rays-bg animate-spin-slow transition-opacity duration-1000 ${
            isLifted ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={currentSkin}
          alt="Evolving Penguin"
          className={`absolute inset-0 object-contain drop-shadow-2xl transition-opacity duration-200
            ${stage === 'shaking' && 'animate-shake-hard'}
            ${!isPenguinVisible && 'opacity-0'}
          `}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={`w-[150vw] max-w-[450px] aspect-square
            bg-[url('/images/boom.png')] bg-contain bg-center bg-no-repeat 
            ${stage === 'flashing' || stage === 'reveal' ? 'animate-boom-burst' : 'opacity-0'}
          `}
        />
      </div>
    </div>
  )
}