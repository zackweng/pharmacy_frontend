import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './global.css'
import { Home } from './pages/Home'

export function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/home" replace /> },
        { path: '/home', element: <Home /> },
        { path: '*', element: 'NotFound' },
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}
