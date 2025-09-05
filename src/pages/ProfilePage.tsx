import { useTelegram } from '@/hooks/useTelegram'

// И отсюда тоже убрали слово 'default'
export function ProfilePage() {
  const { user, webApp } = useTelegram()
  return (
    <div>
      <h1 className="text-2xl font-bold">Профиль</h1>
      <button
        onClick={() => webApp?.showAlert(`Твой Telegram ID: ${user?.id}`)}
        className="mt-4 w-full rounded-lg bg-[var(--tg-theme-button-color)] p-3 text-center font-bold text-[var(--tg-theme-button-text-color)]"
      >
        Показать мой ID
      </button>
    </div>
  )
}
