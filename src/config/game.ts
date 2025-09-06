// src/config/game.ts

// Тип для описания стадий эволюции пингвина
interface PenguinEvolutionStage {
  level: number
  src: string
}

// Стадии эволюции, взятые из твоего constants.js
export const PENGUIN_EVOLUTION_STAGES: PenguinEvolutionStage[] = [
  { level: 1, src: '/images/penguin_infant.webp' }, // Уровень 1, а не 0, так как в сторе начинаем с 1
  { level: 5, src: '/images/penguin_teen.png' },
  { level: 10, src: '/images/penguin_adult.webp' },
  // Добавим еще пару для примера, чтобы было куда расти
  { level: 16, src: '/images/penguin_adult.webp' },
]

// Генерируем цели для уровней, алгоритм взят из твоего constants.js
const TOTAL_LEVELS = 50
export const LEVEL_GOALS: number[] = [0] // Индекс 0 не используется
LEVEL_GOALS.push(50) // Уровень 1

for (let i = 2; i <= TOTAL_LEVELS; i++) {
  const clicks = 40 + 2.5 * Math.pow(i, 2)
  let roundedClicks = Math.round(clicks / 10) * 10
  // Убедимся, что следующий уровень всегда сложнее предыдущего
  if (roundedClicks <= LEVEL_GOALS[i - 1]) {
    roundedClicks = LEVEL_GOALS[i - 1] + 10
  }
  LEVEL_GOALS.push(roundedClicks)
}

// Другие важные константы
export const TAP_COOLDOWN = 35 // ms, задержка между тапами
export const SAVE_PROGRESS_INTERVAL = 15 // Сохранять прогресс каждые N тапов
export const SUBSCRIBE_TASK_BONUS = 1000 // Бонус за подписку
export const CHANNEL_URL = 'https://t.me/dostavkafidele' // Ссылка на канал
