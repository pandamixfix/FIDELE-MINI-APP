// src/app/providers/router.tsx

import { createHashRouter } from 'react-router-dom'
import { MainLayout } from '@/widgets/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage' // ✅ ВОЗВРАЩАЕМ ИМПОРТ
import { ProfilePage } from '@/pages/ProfilePage'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // ✅ ВОЗВРАЩАЕМ HomePage НА ЕЕ ЗАКОННОЕ МЕСТО
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])