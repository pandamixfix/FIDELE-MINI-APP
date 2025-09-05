import { NavLink, Outlet } from 'react-router-dom';

// И снова просто убираем слово 'default' отсюда
export function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-4 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="flex justify-around p-2 bg-[var(--tg-theme-secondary-bg-color)] border-t border-[var(--tg-theme-hint-color)] shrink-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-center text-sm ${isActive ? 'text-[var(--tg-theme-link-color)]' : 'text-[var(--tg-theme-text-color)]'}`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-center text-sm ${isActive ? 'text-[var(--tg-theme-link-color)]' : 'text-[var(--tg-theme-text-color)]'}`
          }
        >
          Профиль
        </NavLink>
      </nav>
    </div>
  );
}