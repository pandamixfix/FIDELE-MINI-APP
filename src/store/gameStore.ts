// src/store/gameStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LEVEL_GOALS, PENGUIN_EVOLUTION_STAGES } from '@/config/game'

export type LevelUpType = 'normal' | 'evolution'

interface GameState {
  level: number
  score: number
  maxScore: number
  bonuses: number
  penguinSkin: string
  lastLevelUpType: LevelUpType | null
  isEvolving: boolean
}

// ✅ Выносим Actions в отдельный интерфейс
interface GameActions {
  applyTapScore: () => void
  clearLastLevelUpType: () => void
  completeEvolution: () => void
  forceEvolution: () => void
  _rehydrate: () => void
}

const getSkinForLevel = (level: number) => {
  return (
    [...PENGUIN_EVOLUTION_STAGES]
      .reverse()
      .find((s) => level >= s.level)?.src ?? PENGUIN_EVOLUTION_STAGES[0].src
  )
}

// ✅ ЭТО КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: мы разделяем состояние (state) и действия (actions)
export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      // --- СОСТОЯНИЕ (STATE) ---
      level: 1,
      score: 0,
      maxScore: LEVEL_GOALS[1] ?? 50,
      bonuses: 0,
      penguinSkin: getSkinForLevel(1),
      lastLevelUpType: null,
      isEvolving: false,

      // --- ДЕЙСТВИЯ (ACTIONS) ---
      applyTapScore: () => {
        const state = get()
        if (state.level >= LEVEL_GOALS.length - 1) return
        const newScore = state.score + 1
        if (newScore < state.maxScore) {
          set({ score: newScore })
          return
        }
        const oldLevel = state.level
        const newLevel = oldLevel + 1
        const levelUpBonus = oldLevel * 100
        const oldSkin = getSkinForLevel(oldLevel)
        const newSkin = getSkinForLevel(newLevel)
        const isEvolution = newSkin !== oldSkin
        set({
          level: newLevel,
          score: newScore - state.maxScore,
          maxScore: LEVEL_GOALS[newLevel] ?? state.maxScore,
          bonuses: state.bonuses + levelUpBonus,
          lastLevelUpType: isEvolution ? 'evolution' : 'normal',
          penguinSkin: newSkin,
          isEvolving: isEvolution,
        })
      },
      clearLastLevelUpType: () => set({ lastLevelUpType: null }),
      completeEvolution: () => set({ isEvolving: false }),
      forceEvolution: () => {
        const state = get()
        const nextEvoLevel = PENGUIN_EVOLUTION_STAGES.find(s => s.level > state.level)?.level ?? 6
        set({
          level: nextEvoLevel,
          score: 0,
          isEvolving: true,
          penguinSkin: getSkinForLevel(nextEvoLevel)
        })
      },
      _rehydrate: () => {
        const { level } = get()
        set({
          maxScore: LEVEL_GOALS[level] ?? LEVEL_GOALS[level - 1] ?? 50,
          penguinSkin: getSkinForLevel(level),
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
      onRehydrateStorage: () => (state) => {
        state?._rehydrate()
      },
    }
  )
)

// ✅ ЭТО ВТОРОЕ КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: мы создаем хук, который возвращает ТОЛЬКО actions
// Так как actions не меняются, React не будет вызывать лишние ререндеры
export const useGameActions = () => useGameStore((state) => ({
    applyTapScore: state.applyTapScore,
    clearLastLevelUpType: state.clearLastLevelUpType,
    completeEvolution: state.completeEvolution,
    forceEvolution: state.forceEvolution,
}))

export const selectPenguinScale = (state: GameState): number => {
    const { level } = state
    const currentStage = [...PENGUIN_EVOLUTION_STAGES].reverse().find(s => level >= s.level) ?? PENGUIN_EVOLUTION_STAGES[0]
    const nextStage = PENGUIN_EVOLUTION_STAGES.find(s => s.level > currentStage.level)
    const stageIndex = PENGUIN_EVOLUTION_STAGES.indexOf(currentStage)
    const minScale = 0.7 + stageIndex * 0.1
    const maxScale = nextStage ? minScale + 0.08 : 1.0
    if (!nextStage || level >= nextStage.level) {
      return minScale
    }
    const levelsInStage = nextStage.level - currentStage.level
    const progressInStage = (level - currentStage.level) / levelsInStage
    return minScale + (maxScale - minScale) * progressInStage
}