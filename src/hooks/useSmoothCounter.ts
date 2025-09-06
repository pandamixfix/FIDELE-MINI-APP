// src/hooks/useSmoothCounter.ts
import { useState, useEffect } from 'react'

export function useSmoothCounter(targetValue: number, duration = 300) {
  const [displayValue, setDisplayValue] = useState(targetValue)

  useEffect(() => {
    let startTime: number | null = null
    const startValue = displayValue

    const animationFrame = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      const nextValue = Math.floor(
        startValue + (targetValue - startValue) * progress
      )
      setDisplayValue(nextValue)

      if (progress < 1) {
        requestAnimationFrame(animationFrame)
      }
    }

    requestAnimationFrame(animationFrame)

    return () => {
      // Cleanup if needed, though for this hook it might not be necessary
    }
  }, [targetValue, duration])

  return displayValue
}
