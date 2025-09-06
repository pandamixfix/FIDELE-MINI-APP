import React from 'react'
import { NavLink, LinkProps } from 'react-router-dom'
import clsx from 'clsx'

// Этот компонент принимает только пропсы для ссылки
export const NavButton: React.FC<LinkProps> = ({
  className,
  children,
  ...props
}) => {
  // Стили здесь точно такие же, как у обычной кнопки для единообразия
  const baseStyles = `
    bg-white border border-gray-200 rounded-2xl 
    py-3 px-2 font-bold text-center text-gray-800 
    shadow-md transition-all duration-100 ease-in-out 
    active:scale-95 active:shadow-sm
    dark:bg-gray-800 dark:border-gray-700 dark:text-white
  `

  return (
    <NavLink
      className={({ isActive }) =>
        clsx(baseStyles, className, isActive && 'bg-gray-200 dark:bg-gray-700')
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}
