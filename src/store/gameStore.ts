// src/store/gameStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LEVEL_GOALS } from '@/config/game'

interface GameState {
  level: number
  score: number
  maxScore: number
  bonuses: number
  addTap: () => void
  _rehydrate: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      level: 1, // Стартовый уровень
      score: 0,
      maxScore: LEVEL_GOALS[1] ?? 50,
      bonuses: 0,

      addTap: () =>
        set((state) => {
          const newScore = state.score + 1

          if (newScore < state.maxScore) {
            return { score: newScore }
          }

          const newLevel = state.level + 1
          if (newLevel >= LEVEL_GOALS.length) {
            return { score: state.maxScore }
          }

          const levelUpBonus = state.level * 100

          return {
            level: newLevel,
            score: newScore - state.maxScore,
            maxScore: LEVEL_GOALS[newLevel] ?? state.maxScore, // ✅ Упрощенная логика
            bonuses: state.bonuses + levelUpBonus,
          }
        }),

      // ✅ ВОТ РЕШЕНИЕ:
      // Эта функция будет вызываться после загрузки данных из localStorage
      _rehydrate: () => {
        const { level } = get()
        // Она берет загруженный `level` и устанавливает правильный `maxScore` для него
        set({
          maxScore: LEVEL_GOALS[level] ?? LEVEL_GOALS[LEVEL_GOALS.length - 1],
        })
      },
    }),
    {
      name: 'fidele-penguin-progress',
      partialize: (state) => ({
        level: state.level,
        score: state.score,
        bonuses: state.bonuses,
      }),
      // ✅ И мы говорим `persist` вызывать нашу функцию после загрузки
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._rehydrate()
        }
      },
    }
  )
)
