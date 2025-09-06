// src/widgets/layouts/BottomNav.tsx

import React from 'react'
import { Button } from '@/shared/ui/Button'

// Убираем props, пока не реализуем модальные окна
export const BottomNav: React.FC = () => {
  const navStyles = `
    grid grid-cols-4 gap-2 p-4
    bg-[var(--tg-theme-secondary-bg-color)]
    border-t border-[var(--tg-theme-hint-color)]
  `

  return (
    <nav className={navStyles}>
      <Button>Задания</Button>
      <Button>Магазин</Button>
      <Button>Рейтинг</Button>
      <Button>Правила</Button>
    </nav>
  )
}
