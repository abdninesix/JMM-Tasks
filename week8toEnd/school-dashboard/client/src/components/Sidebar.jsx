import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUsers, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { MdDashboard } from 'react-icons/md'

const Sidebar = () => {
  const { user, logoutMutation } = useAuth()

  return (
    <aside className="sticky left-0 top-4 flex h-[80vh] min-w-60 flex-col justify-between rounded-lg bg-theme/80 p-4 text-lg font-semibold text-white shadow">
      <div className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded px-4 py-2 duration-100 hover:bg-white/20 hover:text-white active:scale-95"
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded px-4 py-2 duration-100 hover:bg-white/20 hover:text-white active:scale-95"
        >
          <MdDashboard />
          <span>Dashboard</span>
        </Link>

        {user?.role === 'Admin' && (
          <Link
            to="/admin/users"
            className="flex items-center gap-3 rounded px-4 py-2 duration-100 hover:bg-white/20 hover:text-white active:scale-95"
          >
            <FaUsers />
            <span>Users</span>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t pt-4">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded px-4 py-2 duration-100 hover:bg-white/20 hover:text-white active:scale-95"
        >
          <FaUserCircle />
          <span>Profile</span>
        </Link>

        <button
          onClick={logoutMutation.mutate}
          className="flex items-center gap-3 rounded px-4 py-2 text-left text-red-600 duration-100 hover:bg-white/20 hover:text-red-500 active:scale-95"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar