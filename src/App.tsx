import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './global.css'
import { Home } from './pages/Home'
import { Layout } from './pages/Layout'
export function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to="/pharmacy_frontend" replace /> },
        { path: '/pharmacy_frontend', element: <Home /> },
        { path: '*', element: 'NotFound' },
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}
