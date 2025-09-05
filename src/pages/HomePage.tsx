import { useTelegram } from '@/hooks/useTelegram';

// Убрали слово 'default' отсюда
export function HomePage() {
  const { user } = useTelegram();
  return (
    <div>
      <h1 className="text-2xl font-bold">Главная страница</h1>
      <p className="mt-2">Привет, {user?.first_name || 'незнакомец'}!</p>
      <p className="mt-4 text-[var(--tg-theme-hint-color)]">Это базовый шаблон для твоего будущего приложения. Навигация находится внизу.</p>
    </div>
  );
}