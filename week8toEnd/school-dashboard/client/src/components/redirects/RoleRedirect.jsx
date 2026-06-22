import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';

const RoleRedirect = () => {

    const { user, checkingAuth } = useAuth();

    if (checkingAuth) {
        return <CgSpinner size={40} className="mx-auto mt-20 animate-spin" />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.role == "Admin") return <Navigate to="/admin/dashboard" />;

    if (user.role == "Teacher") return <Navigate to="/teacher/dashboard" />;

    return <Navigate to="/student/dashboard" />;
}

export default RoleRedirect