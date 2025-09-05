import React from 'react'
import clsx from 'clsx'

// Никаких больше сложных типов, только пропсы для обычной кнопки
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const baseStyles = `
    bg-white border border-gray-200 rounded-2xl 
    py-3 px-2 font-bold text-center text-gray-800 
    shadow-md transition-all duration-100 ease-in-out 
    active:scale-95 active:shadow-sm
    dark:bg-gray-800 dark:border-gray-700 dark:text-white
  `

  return (
    <button className={clsx(baseStyles, className)} {...props}>
      {children}
    </button>
  )
}
