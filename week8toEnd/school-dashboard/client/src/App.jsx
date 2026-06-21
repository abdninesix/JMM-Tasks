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
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/profile/Profile'
import Users from './pages/admin/Users'
import GuestRoute from './components/GuestRoute'


const App = () => {

  const queryClient = new QueryClient()

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
            <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/users" element={<ProtectedRoute allowedRole="Admin" ><Users /></ProtectedRoute>} />

            {/* Public */}
            <Route path="/about" element={<About />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App