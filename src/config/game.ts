// src/config/game.ts

// Тип для описания стадий эволюции пингвина
interface PenguinEvolutionStage {
  level: number
  src: string
}

// ✅ Обновленные стадии эволюции согласно твоим требованиям
export const PENGUIN_EVOLUTION_STAGES: PenguinEvolutionStage[] = [
  { level: 1, src: '/images/penguin_infant.webp' }, // Уровни 1-5
  { level: 6, src: '/images/penguin_baby.webp' },   // Уровни 6-10
  { level: 11, src: '/images/penguin_teen.png' },  // Уровни 11-15
  { level: 16, src: '/images/penguin_adult.webp' }, // Уровни 16+
]

const TOTAL_LEVELS = 50
export const LEVEL_GOALS: number[] = [0]
LEVEL_GOALS.push(50)

for (let i = 2; i <= TOTAL_LEVELS; i++) {
  const clicks = 40 + 2.5 * Math.pow(i, 2)
  let roundedClicks = Math.round(clicks / 10) * 10
  if (roundedClicks <= LEVEL_GOALS[i - 1]) {
    roundedClicks = LEVEL_GOALS[i - 1] + 10
  }
  LEVEL_GOALS.push(roundedClicks)
}

// Другие важные константы
export const TAP_COOLDOWN = 35
export const SAVE_PROGRESS_INTERVAL = 15
export const SUBSCRIBE_TASK_BONUS = 1000
export const CHANNEL_URL = 'https://t.me/dostavkafidele'