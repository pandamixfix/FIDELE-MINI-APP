import React from 'react'
import { Button } from '@/shared/ui/Button' // <--- ИСПРАВЛЕНО

export const TasksModal: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="h-12 w-12 flex-shrink-0">
          <img
            src="/images/telegram-icon.png"
            alt="Telegram"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="text-left">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Подписка на канал
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Подпишись, чтобы получить бонус!
          </p>
        </div>

        <div className="flex-shrink-0">
          <Button className="!rounded-lg !bg-blue-500 !px-4 !py-2 !text-sm !text-white">
            Перейти
          </Button>
        </div>
      </div>
    </div>
  )
}
