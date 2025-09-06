// src/features/game/GameEffects.tsx

import { useEffect, useState } from 'react'
import { useGameStore, useGameActions } from '@/store/gameStore'
import { LevelUpAnimation } from './LevelUpAnimation'
import { EvolutionScene } from './EvolutionScene'

export const GameEffects = () => {
  const { lastLevelUpType, level, isEvolving } = useGameStore()
  const { clearLastLevelUpType, completeEvolution } = useGameActions()

  const [levelUpKey, setLevelUpKey] = useState<number | null>(null)

  // ЭТОТ useEffect СЛЕДИТ ЗА СОБЫТИЕМ И ТОЛЬКО ЗАПУСКАЕТ АНИМАЦИЮ
  useEffect(() => {
    if (lastLevelUpType === 'normal') {
      setLevelUpKey(Date.now())
    }
    // ❗️ МЫ БОЛЬШЕ НЕ СБРАСЫВАЕМ СОСТОЯНИЕ ЗДЕСЬ
  }, [lastLevelUpType])


  // Если идет эволюция, рендерим сцену
  if (isEvolving) {
    return (
      <EvolutionScene
        onComplete={() => {
          // Сбрасываем состояние ПОСЛЕ завершения анимации
          completeEvolution()
          clearLastLevelUpType()
        }}
      />
    )
  }

  // Если идет левел-ап, рендерим анимацию
  if (levelUpKey) {
    return (
      <LevelUpAnimation
        key={levelUpKey}
        level={level}
        onAnimationComplete={() => {
          setLevelUpKey(null)
          // Сбрасываем состояние ПОСЛЕ завершения анимации
          clearLastLevelUpType()
        }}
      />
    )
  }

  return null
}