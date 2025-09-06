// src/features/game/Penguin.tsx

import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { PENGUIN_EVOLUTION_STAGES } from '@/config/game'
import { TapScore, TapScoreData } from './TapScore'

export const Penguin: React.FC = () => {
  // ✅ ИЗМЕНЕНИЕ: Получаем actions напрямую из стора
  const addTap = useGameStore((state) => state.addTap)
  const level = useGameStore((state) => state.level)
  const [animationClass, setAnimationClass] = useState('')
  const [tapScores, setTapScores] = useState<TapScoreData[]>([])

  const getPenguinImageSrc = () => {
    for (const stage of [...PENGUIN_EVOLUTION_STAGES].reverse()) {
      if (level >= stage.level) return stage.src
    }
    return PENGUIN_EVOLUTION_STAGES[0]?.src || ''
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // ✅ ИЗМЕНЕНИЕ: Вызов стал проще
    addTap()

    setAnimationClass('')
    setTimeout(() => {
      setAnimationClass('animate-penguin-tap')
    }, 10)

    const rect = e.currentTarget.getBoundingClientRect()
    const newScore: TapScoreData = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left - 20 + Math.random() * 40,
      y: e.clientY - rect.top - 50 + Math.random() * 20,
    }

    setTapScores((currentScores) => [...currentScores, newScore])

    setTimeout(() => {
      setTapScores((currentScores) =>
        currentScores.filter((s) => s.id !== newScore.id)
      )
    }, 1000)
  }

  return (
    <div className="relative mx-auto mt-8 h-48 w-48">
      <button
        onClick={handleClick}
        className="h-full w-full rounded-full focus:outline-none"
        aria-label="Tap penguin"
      >
        <div className={animationClass}>
          <img
            src={getPenguinImageSrc()}
            alt="Fidele Penguin"
            className="h-full w-full object-contain drop-shadow-lg"
            draggable="false"
          />
        </div>
      </button>

      {tapScores.map((score) => (
        <TapScore key={score.id} {...score} />
      ))}
    </div>
  )
}
