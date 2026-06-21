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


const App = () => {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position='bottom-right' />
        <BrowserRouter>
          <Navbar />
          <Routes>

            {/* Auth */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected */}
            <Route path="/" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />

            {/* Public */}
            <Route path="/about" element={<About />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App