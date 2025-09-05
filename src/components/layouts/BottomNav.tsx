import React from 'react'
import { Button } from '@/components/ui/Button'
import { ModalType } from './MainLayout' // Импортируем наш новый тип

// Описываем, что наш компонент теперь ожидает получить функцию onOpenModal
interface BottomNavProps {
  onOpenModal: (modal: ModalType) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenModal }) => {
  const navStyles = `
    grid grid-cols-4 gap-2 p-4 
    bg-white/80 backdrop-blur-md 
    border-t border-gray-200
    dark:bg-gray-900/80 dark:border-gray-700
  `

  return (
    <nav className={navStyles}>
      {/* Теперь каждая кнопка при клике вызывает onOpenModal с нужным названием */}
      <Button onClick={() => onOpenModal('tasks')}>Задания</Button>
      <Button onClick={() => onOpenModal('shop')}>Магазин</Button>
      <Button onClick={() => onOpenModal('rating')}>Рейтинг</Button>
      <Button onClick={() => onOpenModal('rules')}>Правила</Button>
    </nav>
  )
}
