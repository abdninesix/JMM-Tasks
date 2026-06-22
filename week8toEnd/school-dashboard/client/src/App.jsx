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

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' />
        <BrowserRouter>
          <Navbar />
          <Routes>

            {/* Guest */}
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
            <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />

            {/* Protected */}
            <Route path="/" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
            <Route path="/dashboard" element={<RoleRedirect ><Home /></RoleRedirect>} />
            <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="Admin" ><AdminDashboard /></ProtectedRoute>} />
            <Route path="admin/users" element={<ProtectedRoute allowedRole="Admin" ><Users /></ProtectedRoute>} />

            {/* Teacher */}
            <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRole="Teacher" ><TeacherDashboard /></ProtectedRoute>} />

            {/* Student */}
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="Student" ><StudentDashboard /></ProtectedRoute>} />

            {/* Public */}
            <Route path="/about" element={<About />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App