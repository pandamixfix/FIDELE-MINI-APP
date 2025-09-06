import React from 'react'
import clsx from 'clsx'
import { Button } from './Button' // Мы будем использовать нашу кнопку для закрытия

interface ModalProps {
  isOpen: boolean // Показываем или скрываем окно?
  onClose: () => void // Функция, которая будет вызываться при закрытии
  title: string // Заголовок окна
  children: React.ReactNode // Содержимое окна
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    // Контейнер, который плавно появляется и исчезает
    <div
      className={clsx(
        'fixed inset-0 z-50 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out dark:bg-gray-950',
        // Если isOpen, окно на экране. Если нет — оно "уезжает" вниз.
        isOpen ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {/* Шапка модального окна */}
      <header className="flex flex-shrink-0 items-center justify-between border-b bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-bold">{title}</h2>
        {/* Используем нашу простую кнопку для закрытия */}
        <Button
          onClick={onClose}
          // Делаем кнопку маленькой и круглой
          className="!rounded-full !p-2 !shadow-none"
          aria-label="Закрыть"
        >
          {/* Знак крестика */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </header>

      {/* Основное содержимое окна */}
      <div className="flex-grow overflow-y-auto p-4">{children}</div>
    </div>
  )
}
