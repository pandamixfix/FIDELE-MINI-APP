import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Modal } from '@/components/ui/Modal'
import { TasksModal } from '@/pages/modals/TasksModal'
import { HUD } from './HUD'
import { useGameStore } from '@/store/gameStore'

export type ModalType = 'tasks' | 'shop' | 'rating' | 'rules' | null

export function MainLayout() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const openModal = (modal: ModalType) => {
    if (modal) setActiveModal(modal)
  }
  const closeModal = () => {
    setActiveModal(null)
  }

  const { level, score, maxScore, bonuses } = useGameStore()

  return (
    <div className="relative flex h-screen w-full max-w-md flex-col overflow-hidden bg-gray-50 shadow-2xl dark:bg-gray-900">
      <HUD level={level} score={score} maxScore={maxScore} bonuses={bonuses} />

      <main className="flex-grow overflow-y-auto p-4 pt-20">
        <Outlet />
      </main>

      <BottomNav onOpenModal={openModal} />

      {/* Модальные окна без изменений */}
      <Modal
        title="Задания"
        isOpen={activeModal === 'tasks'}
        onClose={closeModal}
      >
        <TasksModal />
      </Modal>
      <Modal
        title="Магазин"
        isOpen={activeModal === 'shop'}
        onClose={closeModal}
      >
        <p>Здесь будет контент для магазина...</p>
      </Modal>
      <Modal
        title="Рейтинг"
        isOpen={activeModal === 'rating'}
        onClose={closeModal}
      >
        <p>Здесь будет контент для рейтинга...</p>
      </Modal>
      <Modal
        title="Правила"
        isOpen={activeModal === 'rules'}
        onClose={closeModal}
      >
        <p>Здесь будет контент для правил...</p>
      </Modal>
    </div>
  )
}
