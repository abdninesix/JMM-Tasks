import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const { user, logout } = useAuth();

  return (
    <div className='min-h-[70vh] min-w-60 sticky top-0 left-0 flex flex-col items-start justify-between bg-theme/70 shadow rounded-lg p-4 text-white text-lg font-semibold'>
      <Link to="/dashboard" >Dashboard</Link>
      {user?.role === "Admin" && <Link to="/admin/users" className="font-semibold">Users</Link>}
      <div className='flex flex-col'>
        <Link to="/profile" >Profile</Link>
        <button onClick={logout} className='text-red-500 cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar