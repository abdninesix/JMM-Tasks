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

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' theme='dark' />
        <BrowserRouter>
          <Routes>

            {/* <GuestRoute>
              <ProtectedRoute allowedRole={role} */}

            {/* Guest */}
            <Route element={<Layout />}>
              {guestRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>

            {/* Protected */}
            <Route element={<SidebarLayout />}>
              {protectedRoutes.map(({ path, element, role }) => (
                <Route key={path} path={path} element={element} />
              ))}
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