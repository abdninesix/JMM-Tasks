import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {

    const { user, isAuthenticated, checkingAuth } = useAuth();

    const location = useLocation();

    if (checkingAuth) {
        return <CgSpinner size={40} className="mx-auto mt-20 animate-spin" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRole && !allowedRole.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;