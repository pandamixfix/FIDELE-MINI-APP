// src/store/uiStore.ts

import { create } from 'zustand'
import { RefObject } from 'react'

interface UiState {
  progressBarRef: RefObject<HTMLDivElement | null> | null
  penguinRef: RefObject<HTMLButtonElement | null> | null
}

interface UiActions {
  setProgressBarRef: (ref: RefObject<HTMLDivElement | null>) => void
  setPenguinRef: (ref: RefObject<HTMLButtonElement | null>) => void
}

export const useUiStore = create<UiState & UiActions>((set) => ({
  progressBarRef: null,
  penguinRef: null,
  setProgressBarRef: (ref) => set({ progressBarRef: ref }),
  setPenguinRef: (ref) => set({ penguinRef: ref }),
}))

// ✅ СОЗДАЕМ ХУК ДЛЯ СТАБИЛЬНЫХ ACTIONS
export const useUiActions = () =>
  useUiStore((state) => ({
    setProgressBarRef: state.setProgressBarRef,
    setPenguinRef: state.setPenguinRef,
  }))