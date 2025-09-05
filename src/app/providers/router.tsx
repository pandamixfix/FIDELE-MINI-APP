import { createHashRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])
