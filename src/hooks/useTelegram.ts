import { useEffect } from 'react';

// Теперь TypeScript знает, что такое window.Telegram, и не будет ругаться.
// Знак '?' (optional chaining) защитит нас от падения, если приложение вдруг
// откроется не в Telegram, где этого объекта не будет.
const tg = window.Telegram?.WebApp;

export function useTelegram() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onClose = () => {
    tg?.close();
  };

  return {
    webApp: tg,
    // Предоставляем безопасные значения по умолчанию
    user: tg?.initDataUnsafe?.user || null,
    onClose,
  };
}