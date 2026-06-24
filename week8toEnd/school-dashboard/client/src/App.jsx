import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/profile/Profile'
import Users from './pages/admin/Users'
import GuestRoute from './components/redirects/GuestRoute'
import ProtectedRoute from './components/redirects/ProtectedRoute'
import AdminDashboard from './pages/admin/Dashboard'
import TeacherDashboard from './pages/teacher/Dashboard'
import StudentDashboard from './pages/student/Dashboard'
import RoleRedirect from './components/redirects/RoleRedirect'
import { adminRoutes, guestRoutes, protectedRoutes, publicRoutes, studentRoutes, teacherRoutes } from './utils/routes'

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
            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
            ))}

            {/* Admin */}
            {adminRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={<ProtectedRoute allowedRole="Admin">{element}</ProtectedRoute>} />
            ))}

            {/* Teacher */}
            {teacherRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={<ProtectedRoute allowedRole="Teacher">{element}</ProtectedRoute>} />
            ))}

            {/* Student */}
            {studentRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={<ProtectedRoute allowedRole="Student">{element}</ProtectedRoute>} />
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