// src/features/debug/DebugPanel.tsx

import { useGameStore } from '@/store/gameStore'

export const DebugPanel = () => {
  // ✅ Vite предоставляет специальную переменную, которая равна true только в режиме разработки
  if (!import.meta.env.DEV) {
    return null
  }

  const forceEvolution = useGameStore((state) => state.forceEvolution)

  return (
    <div className="fixed bottom-24 left-2 z-[10000] rounded-lg bg-black/50 p-2 text-white shadow-lg backdrop-blur-sm">
      <h3 className="text-center text-xs font-bold">Debug Panel</h3>
      <div className="mt-2 flex flex-col gap-2">
        <button
          onClick={forceEvolution}
          className="rounded bg-indigo-500 px-2 py-1 text-xs hover:bg-indigo-600 active:bg-indigo-700"
        >
          Trigger Evolution
        </button>
      </div>
    </div>
  )
}