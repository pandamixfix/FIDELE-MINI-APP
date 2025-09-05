import { create } from 'zustand'
import { LEVEL_GOALS } from '@/config/game'

interface GameState {
  level: number
  score: number
  maxScore: number
  bonuses: number
  actions: {
    addTap: () => void
    levelUp: () => void
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  maxScore: LEVEL_GOALS[1],
  bonuses: 0,

  actions: {
    levelUp: () => {
      const { level, score, maxScore, bonuses } = get()
      const levelUpBonus = level * 100

      set({
        level: level + 1,
        score: score - maxScore, // Теперь `score` уже обновлён и вычитание корректно
        maxScore: LEVEL_GOALS[level + 1] ?? maxScore,
        bonuses: bonuses + levelUpBonus,
      })
    },
    addTap: () => {
      // ✅ ИСПРАВЛЕНИЕ: Сначала всегда увеличиваем счёт на 1
      const newScore = get().score + 1
      set({ score: newScore })

      // А теперь, после обновления, проверяем, не пора ли повышать уровень
      const { maxScore, actions } = get()
      if (newScore >= maxScore) {
        actions.levelUp()
      }
    },
  },
}))
