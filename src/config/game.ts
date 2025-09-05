interface PenguinEvolutionStage {
  level: number
  src: string
}

export const PENGUIN_EVOLUTION_STAGES: PenguinEvolutionStage[] = [
  { level: 1, src: '/images/penguin_infant.webp' },
  { level: 6, src: '/images/penguin_baby.webp' },
  { level: 11, src: '/images/penguin_teen.webp' },
  { level: 16, src: '/images/penguin_adult.webp' },
]

const TOTAL_LEVELS = 50
export const LEVEL_GOALS: number[] = [0]
LEVEL_GOALS.push(50)

for (let i = 2; i <= TOTAL_LEVELS; i++) {
  const clicks = 40 + 2.5 * Math.pow(i, 2)
  const roundedClicks = Math.round(clicks / 10) * 10
  LEVEL_GOALS.push(roundedClicks)
}
