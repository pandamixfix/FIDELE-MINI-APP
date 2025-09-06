// src/shared/ui/Button.tsx
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const baseStyles = `
    w-full rounded-2xl
    py-3 px-2 font-bold text-center
    transition-all duration-100 ease-in-out
    active:scale-95 active:opacity-80
    focus:outline-none focus:ring-2 focus:ring-offset-2
    bg-[var(--tg-theme-button-color)]
    text-[var(--tg-theme-button-text-color)]
  `

  return (
    <button className={clsx(baseStyles, className)} {...props}>
      {children}
    </button>
  )
}
