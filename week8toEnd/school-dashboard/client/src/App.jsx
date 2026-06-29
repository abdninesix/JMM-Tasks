import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import GuestRoute from './components/redirects/GuestRoute'
import ProtectedRoute from './components/redirects/ProtectedRoute'
import RoleRedirect from './components/redirects/RoleRedirect'
import { guestRoutes, protectedRoutes, publicRoutes } from './utils/routes'
import Layout from './components/layouts/Layout'
import SidebarLayout from './components/layouts/SidebarLayout'
import RoleGuard from './components/redirects/RoleGuard'

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' theme='dark' />
        <BrowserRouter>
          <Routes>

            {/* Guest */}
            <Route element={<GuestRoute />}>
              <Route element={<Layout />}>
                {guestRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Route>
            </Route>

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route element={<SidebarLayout />}>
                {protectedRoutes.map(({ path, element, role }) => (
                  <Route key={path} path={path} element={<RoleGuard allowedRole={role}>{element}</RoleGuard>} />
                ))}
              </Route>
            </Route>

            {/* Public */}
            <Route element={<Layout />}>
              {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App