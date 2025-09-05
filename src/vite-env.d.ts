/// <reference types="vite/client" />

// Это специальный интерфейс для TypeScript.
// Мы "открываем" стандартный тип Window и добавляем в него наше свойство.
interface Window {
  // Говорим, что в window МОЖЕТ БЫТЬ свойство Telegram (знак ?).
  Telegram?: {
    // У которого есть обязательное свойство WebApp.
    WebApp: {
      // И далее описываем поля и методы, которые мы используем.
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
        };
        // ... и другие поля, которые могут прийти от Telegram
      };
      ready: () => void;
      expand: () => void;
      close: () => void;
      showAlert: (message: string) => void;
    };
  };
}