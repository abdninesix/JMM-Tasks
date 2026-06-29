import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';

const RoleRedirect = () => {

    const { user } = useAuth();

    switch (user.role) {
        case "Admin":
            return <Navigate to="/admin/dashboard" replace />;

        case "Teacher":
            return <Navigate to="/teacher/dashboard" replace />;

        default:
            return <Navigate to="/student/dashboard" replace />;
    }
}

export default RoleRedirect