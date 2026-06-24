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

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' theme='dark' />
        <BrowserRouter>
          <Navbar />
          <Routes>

            {/* Guest */}
            {guestRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={<GuestRoute>{element}</GuestRoute>} />
            ))}

            {/* Protected */}
            {protectedRoutes.map(({ path, element, role }) => (
              <Route key={path} path={path} element={<ProtectedRoute allowedRole={role}>{element}</ProtectedRoute>} />
            ))}

            {/* Public */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App