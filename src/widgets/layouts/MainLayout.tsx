// src/widgets/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { HUD } from './HUD'
import { GameEffects } from '@/features/game/GameEffects'
import { DebugPanel } from '@/features/debug/DebugPanel'
import { useGameStore } from '@/store/gameStore'

export function MainLayout() {
  const isEvolving = useGameStore((state) => state.isEvolving)

  return (
    // ✅ EffectsProvider полностью удален
    <div className="relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-[var(--tg-theme-bg-color)] shadow-2xl">
      <div className={isEvolving ? 'z-0' : 'z-50'}>
        <HUD />
      </div>
      <GameEffects />
      <DebugPanel />
      <main className="flex-grow p-4 pt-20">
        <Outlet />
      </main>
      <div className={isEvolving ? 'z-0' : 'z-50'}>
        <BottomNav />
      </div>
    </div>
  )
}