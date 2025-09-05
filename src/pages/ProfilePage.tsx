import { useTelegram } from '@/hooks/useTelegram';

// И отсюда тоже убрали слово 'default'
export function ProfilePage() {
  const { user, webApp } = useTelegram();
  return (
    <div>
      <h1 className="text-2xl font-bold">Профиль</h1>
      <button onClick={() => webApp?.showAlert(`Твой Telegram ID: ${user?.id}`)} className="w-full mt-4 rounded-lg bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] p-3 font-bold text-center">
        Показать мой ID
      </button>
    </div>
  );
}