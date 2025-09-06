import { useTelegram } from '@/hooks/useTelegram'
import { Penguin } from '@/features/game/Penguin' // <--- ИСПРАВЛЕНО

export function HomePage() {
  const { user } = useTelegram()

  return (
    <div className="text-center">
      <p className="text-gray-500 dark:text-gray-400">
        Привет, {user?.first_name || 'незнакомец'}!
      </p>
      <Penguin />
    </div>
  )
}
